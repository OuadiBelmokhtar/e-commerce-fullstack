package me.obelmokhtar.productcataloguebackend.dao;

import me.obelmokhtar.productcataloguebackend.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*") // autoriser les acces frontend provenant de n importe quel nom de domaine
@PreAuthorize("hasAuthority('USER')") // utiliser repository-level-authorization
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    @RestResource(path = "/filterByDesignation")
    public List<Product> findByDesignationContains(@Param("key") String keyword);

    // obligatoire pr gerer la pagination
    @RestResource(path = "/filterByDesignationPage")
    public Page<Product> findByDesignationContains(@Param("key") String keyword, Pageable pageable);

    @RestResource(path="/selectedProducts")
    public List<Product> findByIsSelectedIsTrue();


    @RestResource(path = "/onPormotionProducts")
    public List<Product> findByIsOnPromotionIsTrue();

}
