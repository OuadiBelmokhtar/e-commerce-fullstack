package me.obelmokhtar.productcataloguebackend.web;

import me.obelmokhtar.productcataloguebackend.dao.CustomerRepository;
import me.obelmokhtar.productcataloguebackend.dao.OrderItemRepository;
import me.obelmokhtar.productcataloguebackend.dao.OrderRepository;
import me.obelmokhtar.productcataloguebackend.dao.ProductRepository;
import me.obelmokhtar.productcataloguebackend.entities.Customer;
import me.obelmokhtar.productcataloguebackend.entities.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

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
    - Cette methode permet de recuperer et suvegarder ds la BD les données de la commande(ordre)
    passée par le client et envoyees de la partie frontend.
    - Ces données seront encapsulées ds un objet OrderFormData.
    - Les données de la commande à récupérer et sauvegarder sont:
      Customer, Order(customer, date)//!!!! totalAmount, Order.orderItems.

     */
    @PostMapping("/orders")
    public Order saveOrder(@RequestBody OrderFormData orderFormData) {
        // recuperer, initialiser et sauvegarder le Customer de l'order
        Customer customer = new Customer();
        customer.setId(orderFormData.getCustomer().getId());
        customer.setName(orderFormData.getCustomer().getName());
        customer.setUsername(orderFormData.getCustomer().getUsername());
        customer.setAddress(orderFormData.getCustomer().getAddress());
        customer.setEmail(orderFormData.getCustomer().getEmail());
        customer.setPhoneNumber(orderFormData.getCustomer().getPhoneNumber());
        customer = customerRepository.save(customer);
        System.out.println("customer.getId(): " + customer.getId());

        // recuperer, initialiser et sauvegarder l'Order
        Order order = new Order();
        order.setCustomer(customer);
        order.setDate(new Date());
        order = orderRepository.save(order);

    }
}
