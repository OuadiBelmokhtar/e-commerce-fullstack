package me.obelmokhtar.productcataloguebackend.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "ProjDesQty", types = Product.class)
public interface ProjectionDesignationQuantity {
    public String getDesignation();
    public Integer getQuantity();
}
