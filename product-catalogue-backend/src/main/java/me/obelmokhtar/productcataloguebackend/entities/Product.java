package me.obelmokhtar.productcataloguebackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String reference;
    @Column(unique = true)
    private String designation;
    private String description;
    private Double currentPrice;
    private Boolean promotion;
    private Boolean selected;
    private Boolean available;
    private String photoName;
    private Integer quantity;
    @ManyToOne
    Category category;
}
