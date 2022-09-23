package me.obelmokhtar.productcataloguebackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
    private Boolean isOnPromotion;
    private Boolean isSelected;
    private Boolean isAvailable;
    // on stocke l URL ds la BD, non pas le nom
    private String photoName;
    private Integer quantity;
    @Transient // pas besoin d etre persistant.
    // Sert a afficher la quantite par defaut a commander ds le champ 'input type=number' ds la page web
    private Integer orderedQuantity = 1;
    @ManyToOne
    Category category;
}
