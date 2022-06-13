package me.obelmokhtar.productcataloguebackend.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class JwtSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        System.out.println("MySecurityConfig.configure(HttpSecurity http)");
        // desactiver la protection contre les attaques CSRF, car CSRF est basé sur les sessions,
        // alors que l'auth stateless ne les utilise pas.
        http.csrf().disable();
        // desactiver la protection par defaut contre les frames HTML
        http.headers().frameOptions().disable();
        // demander a Spring de ne pas utiliser les sessions stockées coté serveur
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // exiger une authentification pr acceder à chaque resource
        http.authorizeRequests().anyRequest().authenticated();
    }

    /* Cette mtd sera invoquee par Spring suite a JwtAuthenticationFilter.attemptAuthentication().
     Elle permet de recuperer le username+pwd+roles de la BD et de les retourner a Spring sous forme d'un objet User
   */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

    }
}
