package me.obelmokhtar.productcataloguebackend.dao;

import me.obelmokhtar.productcataloguebackend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.ManyToMany;

@CrossOrigin("*")
@PreAuthorize("hasAuthority('USER')")
@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {
}
