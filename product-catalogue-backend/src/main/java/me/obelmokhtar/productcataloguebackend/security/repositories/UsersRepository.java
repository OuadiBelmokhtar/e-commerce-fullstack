package me.obelmokhtar.productcataloguebackend.security.repositories;

import me.obelmokhtar.productcataloguebackend.security.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);
}
