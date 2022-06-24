package me.obelmokhtar.productcataloguebackend.dao;

import me.obelmokhtar.productcataloguebackend.entities.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collection;
import java.util.List;

@CrossOrigin("*")
@PreAuthorize("hasAuthority('USER')")
@RepositoryRestResource
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @RestResource( path = "/filterCategoryByName")
    public List<Category> findByNameContains(@Param("key")String keyword);

    @RestResource(path = "/filterCategoryByNamePage")
    public Page<Category> findByNameContains(@Param("key") String keyword, Pageable pageable);


}
