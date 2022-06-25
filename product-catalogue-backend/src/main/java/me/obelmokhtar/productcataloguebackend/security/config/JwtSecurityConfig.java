package me.obelmokhtar.productcataloguebackend.security.config;

import me.obelmokhtar.productcataloguebackend.security.filters.JwtAuthenticationFilter;
import me.obelmokhtar.productcataloguebackend.security.filters.JwtAuthorizationFilter;
import me.obelmokhtar.productcataloguebackend.security.services.UsersAccountService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
// Activer Spring Security ds le projet
@EnableWebSecurity
public class JwtSecurityConfig extends WebSecurityConfigurerAdapter {

    private UsersAccountService usersAccountService;

    public JwtSecurityConfig(UsersAccountService usersAccountService) {
        this.usersAccountService = usersAccountService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        System.out.println("JwtSecurityConfig.configure(HttpSecurity http)");
        // desactiver la protection contre les attaques CSRF, car CSRF est basé sur les sessions,
        // alors que l'auth stateless ne les utilise pas.
        http.csrf().disable();
        // desactiver la protection par defaut contre les frames HTML
        http.headers().frameOptions().disable();
        // demander a Spring de ne pas utiliser les sessions stockées coté serveur
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // autoriser l'inscription des users sans authentification
        http.authorizeRequests().antMatchers("/register/**").permitAll();
        // autoriser le traitement des requetes /refreshToken sans authentification
        http.authorizeRequests().antMatchers("/refreshToken/**").permitAll();
        // autoriser l'accès aux photos des products(pr l affichage ds la grille) sans authentification
        http.authorizeRequests().antMatchers("/get-product-photo/**").permitAll();
        // exiger une authentification pr acceder à ttes les resources
        http.authorizeRequests().anyRequest().authenticated();
        //authenticationManagerBean() est un bean injecté sous dessous
        http.addFilter(new JwtAuthenticationFilter(authenticationManagerBean()));
        // Enregistrer le filtre JwtAuthorizationFilter, sinon il ne va pas intercepter les requêtes
        // lorsqu'on a plsr filtres qui traitent les requetes reçues, addFilterBefore() permet de bien definir
        // l'ordre d'exec des filtres. Ds notre cas, on veut intercepter chaque requete reçue D'ABORD via
        // JwtAuthorizationFilter.doFilterInternal(), alors on va le definir comme le premier a s'executer.
        http.addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    /* Cette mtd sera invoquee par Spring suite a JwtAuthenticationFilter.attemptAuthentication().
     Elle permet de recuperer le username+pwd+roles de la BD et de les retourner a Spring sous forme d'un objet User
   */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        System.out.println("JwtSecurityConfig.configure(AuthenticationManagerBuilder)");
        auth.userDetailsService(new JwtUserDetailsService(this.usersAccountService));
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
