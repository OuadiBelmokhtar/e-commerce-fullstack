package me.obelmokhtar.productcataloguebackend.dao;


import me.obelmokhtar.productcataloguebackend.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
