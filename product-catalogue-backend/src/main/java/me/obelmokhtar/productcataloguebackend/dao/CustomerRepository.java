package me.obelmokhtar.productcataloguebackend.dao;

import me.obelmokhtar.productcataloguebackend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
