package me.obelmokhtar.productcataloguebackend.dao;

import me.obelmokhtar.productcataloguebackend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
