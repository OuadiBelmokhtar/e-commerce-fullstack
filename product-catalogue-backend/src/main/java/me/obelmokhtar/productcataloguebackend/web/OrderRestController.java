package me.obelmokhtar.productcataloguebackend.web;

import me.obelmokhtar.productcataloguebackend.dao.CustomerRepository;
import me.obelmokhtar.productcataloguebackend.dao.OrderItemRepository;
import me.obelmokhtar.productcataloguebackend.dao.OrderRepository;
import me.obelmokhtar.productcataloguebackend.dao.ProductRepository;
import me.obelmokhtar.productcataloguebackend.entities.Customer;
import me.obelmokhtar.productcataloguebackend.entities.Order;
import me.obelmokhtar.productcataloguebackend.entities.OrderItem;
import me.obelmokhtar.productcataloguebackend.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@CrossOrigin("*")
@RestController
public class OrderRestController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    /*
    - Cette methode permet de recuperer et sauvegarder ds la BD les données de la commande(ordre)
      passée par le client et envoyees de la partie frontend.
    - Les données reçues du frontend seront encapsulées ds un objet OrderFormData.
    - Les données de la commande à récupérer et sauvegarder sont:
      Customer, Order(customer, date), totalAmount, Order.orderItems.

     */
    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/orders")
    public Order saveOrder(@RequestBody OrderFormData orderFormData) {
        System.out.println("**** OrderRestController.saveOrder() *****");
        System.out.println("orderFormData recu du frontend: "+orderFormData);

        try {
            // recuperer, initialiser et sauvegarder le Customer correspondant à l'Order
            Customer customer = new Customer();
            customer.setId(orderFormData.getCustomer().getId());
            customer.setName(orderFormData.getCustomer().getName());
            customer.setUsername(orderFormData.getCustomer().getUsername());
            customer.setAddress(orderFormData.getCustomer().getAddress());
            customer.setEmail(orderFormData.getCustomer().getEmail());
            customer.setPhoneNumber(orderFormData.getCustomer().getPhoneNumber());
            customer = customerRepository.save(customer);
            System.out.println("Customer bien sauvegardé, id: " + customer.getId());

            // recuperer, initialiser et sauvegarder l'Order
            Order order = new Order();
            // associer customer à order via une clef etrangere
            order.setCustomer(customer);
            order.setDate(new Date());
            order = orderRepository.save(order);
            System.out.println("Order bien sauvegardé, id: " + order.getId());

            double orderTotalAmount = 0;
            // Recuperer, initialiser et sauvegarder les OrderItems correspondantes à l'Order.
            // Noter bien que ds le diag class, un OrderItem est associe à un Order et un Product
            for (OrderProduct orderProduct : orderFormData.getOrderedProducts()) {
                OrderItem orderItem = new OrderItem();
                // associer order à orderItem, ce qui sera traduit par une clef etrangere
                orderItem.setOrder(order);
                // charger de la BD le Product associe au CaddyItem reçu du frontend
                Product product = productRepository.findById(orderProduct.getAssociatedProduct().getId()).get();
                orderItem.setId(product.getId());
                // associer product à orderItem, ce qui sera traduit par une clef etrangere
                orderItem.setAssociatedProduct(product);
                orderItem.setPrice(orderProduct.getBuyingPrice());
                orderItem.setPurchasedQuantity(orderProduct.getPurchasedQuantity());
                // sauvegarder orderItem
                orderItem = orderItemRepository.save(orderItem);
                System.out.println("OrderItem bien sauvegardé, id: " + orderItem.getId());
                // calculer le mt total de order
                orderTotalAmount += orderItem.getPrice() * orderItem.getPurchasedQuantity();
            }
            // definir le mt total de l'order
            order.setTotalAmount(orderTotalAmount);
            // maj l'order par le mt total
            return orderRepository.save(order);

        } catch (Exception e) {
            System.out.println("Erreur de sauvegarde de la commande: ");
            e.printStackTrace();
            return null;
        }

    }
}
