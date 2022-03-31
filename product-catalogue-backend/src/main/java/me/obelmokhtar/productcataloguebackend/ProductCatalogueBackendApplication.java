package me.obelmokhtar.productcataloguebackend;

import me.obelmokhtar.productcataloguebackend.dao.ProductRepository;
import me.obelmokhtar.productcataloguebackend.entities.Product;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class ProductCatalogueBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductCatalogueBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner init(ProductRepository productRepository) {
        return args -> {
            productRepository.save(new Product(null, "Ordinateur Lx 45", 6700.0, 3));
            productRepository.save(new Product(null, "Imprimante HO", 1700.0, 10));
            productRepository.save(new Product(null, "Smartphone iPhone 12 pro", 9000.0, 5));

            productRepository.findAll().forEach(System.out::println);
        };



    }

}
