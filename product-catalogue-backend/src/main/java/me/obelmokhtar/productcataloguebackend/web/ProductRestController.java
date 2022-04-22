package me.obelmokhtar.productcataloguebackend.web;

import me.obelmokhtar.productcataloguebackend.dao.ProductRepository;
import me.obelmokhtar.productcataloguebackend.entities.Product;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@CrossOrigin("*")
@RestController
public class ProductRestController {
    private ProductRepository productRepository;

    public ProductRestController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping(path = "/get-product-photo/{productPhoto}", produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE})
    public byte[] getProductPhoto(@PathVariable("productPhoto") String productPhoto) throws IOException {
        return Files.readAllBytes(Paths.get(System.getProperty("user.home") + "/ecom-products-photos/" + productPhoto));
    }

    @PostMapping(path = "/upload-product-photo/{idProduct}")
    // photoFile : il faut utiliser le meme nom utilise ds formData.append('photoFile', photo); ds le frontend
    public void uploadProductPhoto(@RequestParam("photoFile") MultipartFile productPhoto, @PathVariable("idProduct") Long idProductToUpdate) throws IOException {
        Product product = productRepository.findById(idProductToUpdate).get();
        // c possible d'utiliser productPhoto.attributs pr recuperer les infos sur la photo originale
        product.setPhotoName(idProductToUpdate + ".jpg");
        // ecrire la photo ds le disque dure
        Files.write(Paths.get(Paths.get(System.getProperty("user.home")) + "/ecom-products-photos/" + product.getPhotoName()), productPhoto.getBytes());
        // maj le nom de la photo ds la BD
        productRepository.save(product);
    }
}
