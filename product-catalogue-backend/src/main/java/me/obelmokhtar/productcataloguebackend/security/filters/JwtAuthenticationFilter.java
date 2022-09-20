package me.obelmokhtar.productcataloguebackend.security.filters;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import me.obelmokhtar.productcataloguebackend.security.config.JwtUtil;
import me.obelmokhtar.productcataloguebackend.security.entities.Users;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/*
    Filtre requis par Spring Security. Il a pour but de :
    - recuperer le username+password suite au login de l'utilisateur(soit via POST/login ou formLogin).
    - verifier que le username+password saisis par l'utilisateur correspondent à ceux ds la BD.
    - Si correctes, définir, générer le JWT et le renvoyer au client ds le corps de la response.
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /* - Invoquée par Spring suite à l'authentification de l'utilisateur soit via une request POST /login ou via formLogin
          - permet de recuperer le username+password reçus ds le CORPS de la requete, de les encapsuler ds un objet de type
            UsernamePasswordAuthenticationToken et de le retourner a Spring sous forme d'un objet Authentication.
          - Spring va ensuite invoquer MySecurityConfig.configure(AuthenticationManagerBuilder auth).loadUserByUsername() pr
            recup username+pwd+roles de la BD.
          - Ensuite Spring va vérifier est-ce que le pwd reçu ds la requête est équivalent à celui récupéré de la BD ;
            si oui, il va invoquer JwtAuthenticationFilter.successfulAuthentication() en passant le résultat d'authentification
            ds le param authResult, pr générer le JWT.
          FAIS ATTENTION: pr utiliser request.getParameter(), la requete POST doit contenir les 2 headers
          Content-Type=application/x-www-form-urlencoded et Accept=application/json.
        */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter.attemptAuthentication()");
        /* on va pas utiliser request.getParameter(), car cette mtd permet de récupérer les données
           envoyées en format text par un formulaire avec le type 'Content-Type': 'application/x-www-form-urlencoded’. Cependant,
           si les données sont envoyées en format JSON(c’est le cas de Angular), il faut utiliser ObjectMapper():
         */
        try {
            // recuperer les donnees envoyees ds la requete format JSON et les convertir a un objet Users. ObjectMapper est un objet de la biblio Jakson.
            Users currentUser = new ObjectMapper().readValue(request.getInputStream(), Users.class);
            System.out.println("username: " + currentUser.getUsername());
            System.out.println("password: " + currentUser.getPassword());
            // password correct for all users is 1234
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken
                    (currentUser.getUsername(), currentUser.getPassword());
            // retourner un objet Authentication qui encapsule le username+password de l'utilsiateur authentifié
            return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }

    /* - Invoquée par Spring juste après attemptAuthentication(), lorsque l'authentification(username+password valides)
          est réussite, en passant le résultat d'authentification ds le param authResult.
        - Permet de recuperer le User(username+password+roles) authentifié à partir du param authResult
        - Générer le JWT accessToken+refreshToken en utilisant la biblio auth0 JWT (Java JWT).
        - Envoyer le JWT accessToken+refreshToken ds le header de la response
      */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("JwtAuthenticationFilter.successfulAuthentication()");
        // getPrincipal() permet de retourner le user authentifié (reçu de la part de attemptAuthentication()),
        // contenant le username+password+roles necessaires pr générer le JWT
        User authenticatedUser = (User) authResult.getPrincipal();
        // pr generer le JWT, il faut calculer la signature via un algorithme soit HMAC ou RSA
        // Declarer l'algo de calcule de la signature via un secret(mot de passe ou clé privé) à ne pas partager
        Algorithm hmacAlgo = Algorithm.HMAC256(JwtUtil.JWT_SIGN_SECRET);
        // Creer et definir le payload+signature du accessToken
        // Noter bien qu'on ne stocke pas le password ds le token JWT
        String accessToken = JWT.create()
                //avec les standards claims:
                // l'identifiant du authenticatedUser
                .withSubject(authenticatedUser.getUsername())
                // la duree d'expiration en milliseconde: 365 jours
                .withExpiresAt(new Date(System.currentTimeMillis() + 365 *24* 60 *60* 1000))
                // private claim qui contient les roles extraits de authenticatedUser et converties en List de String
                // on passer une List pr que ça soit serialisee correctement en JSON.
                .withClaim("roles", authenticatedUser.getAuthorities().stream().map(ga -> ga.getAuthority().toString())
                        .collect(Collectors.toList()))
                // URL de l'app qui a genere le token
                .withIssuer(request.getRequestURL().toString())
                // calculer la signature et signer le JWT
                .sign(hmacAlgo);
        // Creer et definir le payload+signature du refreshToken
        String refreshToken = JWT.create()
                //avec les standards claims:
                // l'identifiant du authenticatedUser
                .withSubject(authenticatedUser.getUsername())
                // la duree d'expiration en milliseconde généralement plus longue (1 annee)
                .withExpiresAt(new Date(System.currentTimeMillis() + 365 * 24 * 60 * 60 * 1000))
                // calculer la signature et signer le JWT
                .sign(hmacAlgo);
        // Envoyer les deux tokens ds le CORPS de la response ds une map en format JSON.
        // Noter bien que c'est possible de les envoyer ds deux headers ds la response, mais ce n'est pas pratique.
        Map<String, String> idTokens = new HashMap<>();
        idTokens.put("access-token", accessToken);
        idTokens.put("refresh-token", refreshToken);
        // indiquer au client que le corp de la response est en format JSON
        response.setContentType("application/json");
        // ObjectMapper est utilisé par Spring pr serialiser un objet en format JSON
        new ObjectMapper().writeValue(response.getOutputStream(), idTokens);
        // envoyer le JWT au client ds le header 'Authorization' de la réponse. Solution utilisée lorsqu'on a un seul token
        // response.setHeader("Authorization", jwtAccessToken);

    }


}
