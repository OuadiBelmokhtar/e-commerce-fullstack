package me.obelmokhtar.productcataloguebackend;

import me.obelmokhtar.productcataloguebackend.dao.CategoryRepository;
import me.obelmokhtar.productcataloguebackend.dao.ProductRepository;
import me.obelmokhtar.productcataloguebackend.entities.Category;
import me.obelmokhtar.productcataloguebackend.entities.Product;
import me.obelmokhtar.productcataloguebackend.security.config.JwtUtil;
import me.obelmokhtar.productcataloguebackend.security.entities.Roles;
import me.obelmokhtar.productcataloguebackend.security.entities.Users;
import me.obelmokhtar.productcataloguebackend.security.services.UsersAccountService;
import me.obelmokhtar.productcataloguebackend.service.CategoryService;
import me.obelmokhtar.productcataloguebackend.service.ProductService;
import org.springframework.beans.ConfigurablePropertyAccessor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.UUID;


/* - Activer la definition des autorisations d acces aux ressources sous forme des @nnotations.
   - Cela permet d'utiliser les @nnotations pour definir les autorisations d acces aux méthodes qlq
     soit leurs emplacements(ds la couche service ou web/rest).
   - prePostEnabled = true: enables Spring Security @PreAuthorize and @PostAuthorize Annotations.
     e.g.: @PreAuthorize("hasRole('USER')"), @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')").
     It is the MOST SOPHISTICATED security model(selon un tuto Spring officiel)
   - securedEnabled = true: determines if the @Secured annotation should be enabled.
     e.g.: @Secured("USER"), @Secured({"USER", "ADMIN" })
   - jsr250Enabled = true: allows us to use the @RoleAllowed annotation.
     e.g.: @RolesAllowed("USER"), @RolesAllowed({"USER", "ADMIN" })
   - plus d'info sur: https://www.baeldung.com/spring-security-method-security
*/
// autoriser seulement @PrePostEnabled
@SpringBootApplication()
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ProductCatalogueBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductCatalogueBackendApplication.class, args);
    }
    @Bean
    CommandLineRunner initDataBase(ProductRepository productRepository,
                           CategoryRepository categoryRepository,
                           ProductService productService,
                           CategoryService categoryService,
                           UsersAccountService usersAccountService,
                           RepositoryRestConfiguration repositoryRestConfiguration) {

        // par défaut SpringDataRest n'expose (renvoyer ds la reponse) pas les Id des entités
        // Demander a SpringDataRest d'exposer les ID ds les résultats JSON
        repositoryRestConfiguration.exposeIdsFor(Product.class, Category.class);

        return args -> {
            // voir @Builder ds entities Users et Roles
           /* Users userAdmin = Users.builder().username("admin").password("1234").active(true).build();
            Users user1 = Users.builder().username("user1").password("1234").active(true).build();
            Users user2 = Users.builder().username("user2").password("1234").active(true).build();
            Roles admin = Roles.builder().name(JwtUtil.ROLES.ADMIN.toString()).build();
            Roles user = Roles.builder().name(JwtUtil.ROLES.USER.toString()).build();
            user1 = usersAccountService.addNewUser(user1);
            user2 = usersAccountService.addNewUser(user2);
            userAdmin = usersAccountService.addNewUser(userAdmin);
            usersAccountService.addNewRole(admin);
            usersAccountService.addNewRole(user);

            usersAccountService.addRoleToUser(JwtUtil.ROLES.ADMIN.toString(), userAdmin.getUsername());
            usersAccountService.addRoleToUser(JwtUtil.ROLES.USER.toString(), userAdmin.getUsername());
            usersAccountService.addRoleToUser(JwtUtil.ROLES.USER.toString(), user1.getUsername());
            usersAccountService.addRoleToUser(JwtUtil.ROLES.USER.toString(), user2.getUsername());
            */

//            Category category1 = new Category(null, "PC Portable", "Différentes marques des PC porables", null);
//            Category category2 = new Category(null, "Imprimante", "Différentes marques des imprimantes", null);
//            categoryRepository.save(category1);
//            categoryRepository.save(category2);
//
//            productRepository.save(new Product(null, UUID.randomUUID().toString(), "Ordinateur Lx 45", 6700.0, 3, category1));
//            productRepository.save(new Product(null, UUID.randomUUID().toString(), "Imprimante HO", 1700.0, 10, category2));
//            productRepository.save(new Product(null, UUID.randomUUID().toString(), "Smartphone iPhone 12 pro", 9000.0, 5, null));

            // productService.getAllProducts().forEach(System.out::println);
            //categoryRepository.findAll().forEach(System.out::println);
        };
    }

    /* Placer l'objet retourné ds le contexte Spring, ce qui permet d’avoir UNE SEULE instance
       qu’on peut injecter et utiliser ds toutes les classes de l’application.*/
    @Bean
    PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
