package me.obelmokhtar.productcataloguebackend.security.web;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import me.obelmokhtar.productcataloguebackend.security.config.JwtUtil;
import me.obelmokhtar.productcataloguebackend.security.entities.Users;
import me.obelmokhtar.productcataloguebackend.security.services.UsersAccountService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
public class JwtUtilRestController {

    private  UsersAccountService usersAccountService;

    public JwtUtilRestController(UsersAccountService usersAccountService) {
        this.usersAccountService = usersAccountService;
    }

    // ce n est pas la peine de definir l autorisation d acces, car le refresh-token ne contient
    // pas la list des roles, mais seulement le username. En plus le path '/refreshToken/**' est
    // deja autorise ds JwtSecurityConfig.configure()
    //@PreAuthorize("hasAuthority('USER')")
    @GetMapping(path = "/refreshToken")
    // les deux objets passés en arg seront injectés par Spring
    public void takeRefreshTokenAndGetAccessToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("JwtUtilRestController.takeRefreshTokenAndGetAccessToken()");
        // 1. Recuperer et verifier le refresh-token reçu ds le header 'Authorization'. Ce sont les memes
        //    instructions que ds la mtd JwtAuthorizationFilter.doFilterInternal.
        String refreshToken = request.getHeader(JwtUtil.JWT_HEADER_NAME);
        if (refreshToken != null && refreshToken.startsWith("Bearer ")) {
            try {
                String refreshTokenWithoutPrefix = refreshToken.substring(7);
                Algorithm hmacAlgo = Algorithm.HMAC256(JwtUtil.JWT_SIGN_SECRET);
                JWTVerifier jwtVerifier = JWT.require(hmacAlgo).build();
                DecodedJWT decodedJWT = jwtVerifier.verify(refreshTokenWithoutPrefix);
                // recuprer le username du JWT. Pr les roles c est pas la peine, car on va les recharger de la BD.
                String username = decodedJWT.getSubject();
                // une fois nous avons username, on peut verifier la blacklist
                // 2. Recharger les donnees de cet utilisateur de la BD, pr tenir compte s il y a
                //    des changements ds les roles ou password.
                Users user = usersAccountService.loadUserByUsername(username);
                // 3. Generer un nouvel accessToken
                String renewedJwtAccessToken = JWT.create().withSubject(username)
                        // la duree d'expiration en milliseconde (10min)
                        .withExpiresAt(new Date(System.currentTimeMillis() + 15 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        // pr les roles, il faut passer une List pr que ça soit serialisee correctement en JSON.
                        .withClaim("roles", user.getRoles().stream().map(role -> role.getName())
                                .collect(Collectors.toList()))
                        .sign(hmacAlgo);
                // 4. Creer et definir le payload+signature du Refresh JWT
                String renewedJwtRefreshToken = JWT.create()
                        .withSubject(user.getUsername())
                        .withIssuer(request.getRequestURL().toString())
                        // la duree d'expiration en milliseconde généralement plus longue (1 annee)
                        .withExpiresAt(new Date(System.currentTimeMillis() + (1 * 365 * 24 * 60 * 60 * 1000)))
                        // pas besoin de mettre les infos d'accès (roles), le refreshToken c'est juste un token avec
                        // une durrée de vie plus longue par rapport a accessToken
                        //.withClaim("roles", authenticatedUser.getAuthorities().stream().map(ga -> ga.getAuthority().toString())
                        // .collect(Collectors.toList()))
                        // calculer la signature et signer le JWT
                        .sign(hmacAlgo);
                // 5. Envoyer les deux tokens ds le CORPS de la response ds une map en format JSON.
                // Noter bien que c'est possible de les envoyer ds deux headers ds la response, mais ce n'est pas pratique.
                Map<String, String> idTokens = new HashMap<>();
                idTokens.put("access-token", renewedJwtAccessToken);
                idTokens.put("refresh-token", renewedJwtRefreshToken);
                // indiquer au client que le corp de la response est en format JSON
                response.setContentType("application/json");
                // ObjectMapper est utilisé par Spring pr serialiser un objet en format JSON
                new ObjectMapper().writeValue(response.getOutputStream(), idTokens);
            } catch (Exception e) {
                response.setHeader("error-message", e.getMessage());
                response.sendError(HttpServletResponse.SC_FORBIDDEN);
            }
        } else {
            throw new RuntimeException("Refresh token required");
        }
    }
}
