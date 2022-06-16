package me.obelmokhtar.productcataloguebackend.web;

import me.obelmokhtar.productcataloguebackend.dao.OrderRepository;
import me.obelmokhtar.productcataloguebackend.dao.PaymentRepository;
import me.obelmokhtar.productcataloguebackend.entities.Order;
import me.obelmokhtar.productcataloguebackend.entities.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

// j'ai cree ce service rest juste pr pouvoir autogénérer referencePayment lors de la sauvegarde d'un Payment

@CrossOrigin("*")
@RestController
public class PaymentRestController {

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private OrderRepository orderRepository;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/payments")
    public Payment savePayment(@RequestBody Payment paymentFormData) {
        System.out.println("****  PaymentRestController.savePayment()  *****");
        System.out.println("Payment recu du frontend: " + paymentFormData);
        paymentFormData.setReferencePayment(UUID.randomUUID().toString());
        Order order = new Order();
        System.out.println("paymentFormData.getOrder().getId() "+paymentFormData.getOrder().getId());
        order = orderRepository.findById(paymentFormData.getOrder().getId()).get();
        paymentFormData.setOrder(order);
        Payment payment = paymentRepository.save(paymentFormData);
        System.out.println("Payement bien sauvegradé: " + payment);
        return payment;
    }
}
