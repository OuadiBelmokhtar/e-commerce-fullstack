package me.obelmokhtar.productcataloguebackend.web;

import me.obelmokhtar.productcataloguebackend.dao.ProductRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
public class ProductRestController {
    private ProductRepository productRepository;

    public ProductRestController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping(path = "/get-product-photo/{idProduct}", produces = MediaType.IMAGE_PNG_VALUE)
    byte[] getProductPhoto(@PathVariable("idProduct") Long productId) throws IOException {
        String photoName = productRepository.findById(productId).get().getPhotoName();
        return Files.readAllBytes(Paths.get(System.getProperty("user.home") + "/ecom-products-photos/" + photoName));
    }
}
