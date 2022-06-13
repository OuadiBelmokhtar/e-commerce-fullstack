package me.obelmokhtar.productcataloguebackend.security.repositories;

import me.obelmokhtar.productcataloguebackend.security.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Roles,Long > {
    Roles findByName(String name);
}
