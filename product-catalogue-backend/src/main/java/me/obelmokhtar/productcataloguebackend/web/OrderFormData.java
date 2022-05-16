package me.obelmokhtar.productcataloguebackend.web;

import lombok.Data;
import me.obelmokhtar.productcataloguebackend.entities.Customer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/*
- Cette classe représente les données envoyées par la partie frontend ds la requête POST
lors du click sur le button customer.component.ts.onConfirmOrder().
- Ces données sont:
    - customer: les infos sur le customer, initialisées ds customer.component.ts.onSaveCustomerInfos()
    - orderedProducts: les products existent ds le panier et chargés via this.loadProductsFromCurrentCaddyToOrder()
 */
@Data
public class OrderFormData {
    private Customer customer;
    private List<OrderProduct> orderProducts = new ArrayList<OrderProduct>();
}

/* cette classe représente un OrderItem(backend)/CaddyItem(frontend),
   mais seulement avec les données nécessaires à envoyer ds la requtete POST.
 */
@Data
class OrderProduct {
    private Long id;
    private Integer orderedQuantity;
    private Double buyingPrice;
}
