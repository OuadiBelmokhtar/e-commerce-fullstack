package me.obelmokhtar.productcataloguebackend.security.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import me.obelmokhtar.productcataloguebackend.security.config.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/* Filtre requis par Spring Security. Il sera exécuté pour chaque requête envoyée à l'application. Il a pour but de
   - recupérer le token JWT envoyé ds les requetes, le verifier, le valider, recuperer les claims(username+roles)
     afin d'authentifier le user ds le context de Spring Security. Ce qui va permettre à Spring Security
     d'autoriser/interdire l'accès à la ressource.
   - Sinon, renvoyer au client un message et code d'erreur.
 */
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    // cette mtd s'exécute a chaque fois que le backend reçoit une requete
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("JwtAuthorizationFilter.doFilterInternal()");
        /* - Obligatoire lorsque la partie frontend tourne ds un navigateur(app Angular, ...).
           - Ces headers sont important pr informer le navigateur(au travers la req OPTIONS)
             que la partie backend(sécurisée via Spring Security) autorise et expose ces types
             de headers, ce qui permet de recevoir une réponse correcte ds la partie frontend. Sinon,
             elle va recevoir une reponse erronee.
           - Ces headers seront ajoutés à la réponse de chaque requete recue.
        */
        //quels sont les domaines à partir desquels la partie backend autorise recevoir des requêtes?
        response.addHeader("Access-Control-Allow-Origin", "*");
        // quels sont les headers que la partie backend autorise à recevoir ds des requêtes provenant de la partie frontend?
        response.addHeader("Access-Control-Allow-Headers", "authorization, Content-Type, Accept, Origin, X-Requested-With, " +
                "Access-Control-Request-Method, Access-Control-Request-Headers");
        // quels sont les headers que la partie backend autorise à renvoyer (et à lire via du JS) ds la réponse à
        // la partie frontend? Autrement dit, quels sont les response headers à exposer à lire via du JS par
        // la partie frontend ?
        response.addHeader("Access-Control-Expose-Headers", "authorization, Access-Control-Allow-Origin, Access-Control-Allow-Credentials");
        // GET et POST sont autorises par defaut, alors qu'il faut autoriser les autres explicitement
        response.addHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
        // Obligatoire pour ignorer la requete OPTIONS. Sinon, ca va pas marcher
        if(request.getMethod().equals("OPTIONS")){
            response.setStatus(HttpServletResponse.SC_OK);
        /* 1. Ignorer le path ‘/refreshToken’. Car si on le fait pas, une requête avec le refresh-token ds
              le header ‘Authorization’ sera considérée et traitée comme s’il s’agit de access-token ce
              qui va causer NPE lors de la récupération des ‘roles’ à partie de refresh-token.
           2. Ignorer le path ‘/login’ pr traiter le cas ou la requete '/login' contient le header 'Authorization'.
              Car, normalement pour ce cas(/login), il faut generer le access-token + refresh-token.
         */
        }else if (request.getServletPath().equals("/refreshToken") || request.getServletPath().equals("/login")) {
            filterChain.doFilter(request, response);

        } else {// lire le access-token
            // recuperer le header 'Authorization' qui contient le access-token de chaque requete reçue
            String accessTokenWithPrefix = request.getHeader(JwtUtil.JWT_HEADER_NAME);
            /* Verfier que le token existe ds le header et commence par le prefix 'Bearer '.
               En effet, par convention il existe plsr préfixes(Basic, Bearer, NTML, OAuth2, ...)
               utilisés par l'authentification HTTP. Le prefix 'Bearer' est utilisé lorsque
               l'authentification est basée sur les tokens JWT.
             */
            if (accessTokenWithPrefix != null && accessTokenWithPrefix.startsWith("Bearer ")) {
                System.out.println("JwtAuthorizationFilter.doFilterInternal(), JWT accessToken is OK");
                try {
                    // enlever le prefixe 'Bearer ' du token
                    String accessToken = accessTokenWithPrefix.substring(7);
                    /* signer le JWT pr verifier qu il est valide.
                       il faut utiliser le meme secret(clé privé) utilisé pr générer la signature du JWT initial
                       envoyé au client. C'est pas le cas pr RSA.
                     */
                    Algorithm hmacAlgo = Algorithm.HMAC256(JwtUtil.JWT_SIGN_SECRET);
                    // creer un verifier pr verifier le token JWT
                    JWTVerifier jwtVerifier = JWT.require(hmacAlgo).build();
                    // verifier, parser et retourner le JWT contenant les claims(username, roles, ...)
                    // en cas de prob de verification(JWT expiré, signature non valide), une exception sera levée
                    DecodedJWT decodedJWT = jwtVerifier.verify(accessToken);
                    // recup username+roles
                    String username = decodedJWT.getSubject();
                    System.out.println("Username from JWT accessToken: " + username);
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    System.out.println("Roles from JWT accessToken: " + Arrays.toString(roles));
                    List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                    for (String role : roles) {
                        grantedAuthorities.add(new SimpleGrantedAuthority(role));
                    }
                    /* creer un objet User de Spring pr authentifier l'utilisateur.
                       pas besoin de passer le password(dailleurs n existe pas ds le token JWT),
                       juste username+roles suffit pr identifier le user
                    */
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                            new UsernamePasswordAuthenticationToken(username, null, grantedAuthorities);
                    /* placer l'utilisateur ds le contexte de Spring Security, ce qui permet à Spring d'authentifier
                       le user et verif des autorisations d'accès lors de la demande d'une ressources.
                     */
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    // une fois le user est bien authentifié, Spring peut passer aux autres filtres
                    filterChain.doFilter(request, response);

                } catch (Exception e) {
                    // traiter le cas de prob de verification(JWT expiré, signature non valide)
                    // renvoyer l erreur ds le header de la response
                    response.setHeader("error-message", e.getMessage());
                    // renvoyer le code HTTP de l erreur pr indiquer a l'utilisateur qu'il n'a pas
                    // les droits d'accèder à la resource sollicitée.
                    response.sendError(HttpServletResponse.SC_FORBIDDEN);
                    System.out.println("Exception while checking JWT accessToken signature: " + e.getMessage());
                }
            } else { // si le JWT n existe pas ds la requete reçu
                System.out.println("JwtAuthorizationFilter.doFilterInternal(), JWT accessToken is not valide !!!");
                // demander a Spring de passer au filtre suivant, tenant compte qu'il ne reconnait pas le user
                filterChain.doFilter(request, response);
            }
        }
    }
}
