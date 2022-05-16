package me.obelmokhtar.productcataloguebackend.dao;

import me.obelmokhtar.productcataloguebackend.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
