package me.obelmokhtar.productcataloguebackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String reference;
    @Column(unique = true)
    private String designation;
    private Double price;
    private Integer quantity;
    @ManyToOne
    Category category;
}
