package me.obelmokhtar.productcataloguebackend;

import me.obelmokhtar.productcataloguebackend.dao.CategoryRepository;
import me.obelmokhtar.productcataloguebackend.dao.ProductRepository;
import me.obelmokhtar.productcataloguebackend.entities.Category;
import me.obelmokhtar.productcataloguebackend.entities.Product;
import me.obelmokhtar.productcataloguebackend.service.CategoryService;
import me.obelmokhtar.productcataloguebackend.service.ProductService;
import org.springframework.beans.ConfigurablePropertyAccessor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class ProductCatalogueBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductCatalogueBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner init(ProductRepository productRepository,
                           CategoryRepository categoryRepository,
                           ProductService productService,
                           CategoryService categoryService,
                           RepositoryRestConfiguration restConfiguration) {

        restConfiguration.exposeIdsFor(Product.class);
        restConfiguration.exposeIdsFor(Category.class);

        return args -> {
            Category category1=new Category(null,"PC Portable", "Différentes marques des PC porables",null);
            Category category2=new Category(null,"Imprimante", "Différentes marques des imprimantes",null);
            categoryRepository.save(category1);
            categoryRepository.save(category2);

            productRepository.save(new Product(null, UUID.randomUUID().toString(),"Ordinateur Lx 45", 6700.0, 3,category1));
            productRepository.save(new Product(null, UUID.randomUUID().toString(), "Imprimante HO", 1700.0, 10,category2));
            productRepository.save(new Product(null, UUID.randomUUID().toString(), "Smartphone iPhone 12 pro", 9000.0, 5,null));

           // productService.getAllProducts().forEach(System.out::println);
            //categoryRepository.findAll().forEach(System.out::println);
        };



    }

}
