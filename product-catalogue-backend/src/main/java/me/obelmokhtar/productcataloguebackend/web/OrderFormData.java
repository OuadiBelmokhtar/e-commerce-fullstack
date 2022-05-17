package me.obelmokhtar.productcataloguebackend.web;

import lombok.Data;
import me.obelmokhtar.productcataloguebackend.entities.Customer;
import me.obelmokhtar.productcataloguebackend.entities.Product;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/*
- Cette classe représente les objets d'accueil des données envoyées par la partie frontend
  ds la requête POST lors du click sur le button customer.component.ts.onConfirmOrder().
- Ces données sont:
    - customer: les infos sur le customer, initialisées ds customer.component.ts.onSaveCustomerInfos()
    - orderedProducts: les products existent ds le panier et chargés via this.loadProductsFromCurrentCaddyToOrder()
 */
@Data
// FAIT ATTENTION, cette classe devrait avoir les memes noms des proprietes que celle(Order) du frontend.
// Ceci est indispensable pr avoir un mapping JSON correct entre l'objet envoye par le frontend et l'objet d'accueil du backend.
public class OrderFormData {
    // FAIT ATTENTION, ttes ces proprietes devraient avoir les memes noms que celles envoyees du frontend.
    private Customer customer;
    private List<OrderProduct> orderedProducts = new ArrayList<OrderProduct>();
}

/* Cette classe représente un OrderItem(backend)/CaddyItem(frontend),
   mais seulement avec les données nécessaires à recevoir ds la requtete POST.
 */
@Data
// FAIT ATTENTION, cette classe devrait avoir les memes noms des proprietes que celle(CaddyItem) du frontend.
// Ceci est indispensable pr avoir un mapping JSON correct entre l'objet envoye par le frontend et l'objet d'accueil du backend.
class OrderProduct {
    private Product associatedProduct;
    private Integer purchasedQuantity;
    private Double buyingPrice;
}
