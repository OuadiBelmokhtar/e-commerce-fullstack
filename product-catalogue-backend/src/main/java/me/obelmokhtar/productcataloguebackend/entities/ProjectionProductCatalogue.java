package me.obelmokhtar.productcataloguebackend.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "projProductCatalogue", types = Product.class)
public interface ProjectionProductCatalogue {

    String getDesignation();
    String getPhotoName();
    Double getCurrentPrice();
}
