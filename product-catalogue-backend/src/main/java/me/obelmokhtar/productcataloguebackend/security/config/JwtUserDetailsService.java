package me.obelmokhtar.productcataloguebackend.security.config;

import me.obelmokhtar.productcataloguebackend.security.entities.Users;
import me.obelmokhtar.productcataloguebackend.security.services.UsersAccountService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Collection;

/* Type d'authentification qui consiste à définir notre propre démarche pr retrouver
   les utilisateurs et leurs droits d'accès
*/
public class JwtUserDetailsService implements UserDetailsService {
    private UsersAccountService usersAccountService;

    public JwtUserDetailsService(UsersAccountService usersAccountService) {
        this.usersAccountService = usersAccountService;
    }

    /* - Cette mtd sera exécutée par Spring Security just après la reception du username+password de
             la mtd JwtAuthenticationFilter.attemptAuthentication().
           - Elle accepte comme argument le username reçu ds la requete(POST /login) ou saisi ds le
             formLogin et retourne un objet User de Spring représentant le user authentifié
         */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // recuperer les details sur le user authentifié
        Users authenticatedUser = usersAccountService.loadUserByUsername(username);
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        // charger les roles du user stockés ds la BD ds une collection de type GrantedAuthority
        authenticatedUser.getRoles().forEach(role -> grantedAuthorities.add(new SimpleGrantedAuthority(role.getName())));
        // retourner a Spring les details sur le user authentifié(username+password+roles)
        // à ce point, Spring Security va s'occuper du rest:
        // - comparer les mots de passe(en utilisant BCrypt)
        // - comparer les rôles que possède le user avec les droits d'accès que possède la ressource demandée
        // - autoriser ou bien interdire le user d y accéder
        return new User(authenticatedUser.getUsername(), authenticatedUser.getPassword(), grantedAuthorities);
    }
}
