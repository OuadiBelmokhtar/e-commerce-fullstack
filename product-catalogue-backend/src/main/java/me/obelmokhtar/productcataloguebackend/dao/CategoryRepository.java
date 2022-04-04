package me.obelmokhtar.productcataloguebackend.dao;

import me.obelmokhtar.productcataloguebackend.entities.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import java.util.Collection;

@RepositoryRestResource
public interface CategoryRepository extends JpaRepository<Category, Long> {

    public Collection<Category> findByNameContains(String keyword);
    public Page<Category> findByNameContains(String keyword, Pageable pageable);
}
