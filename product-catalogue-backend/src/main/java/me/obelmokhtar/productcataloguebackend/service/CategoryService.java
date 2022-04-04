package me.obelmokhtar.productcataloguebackend.service;

import me.obelmokhtar.productcataloguebackend.entities.Category;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

public interface CategoryService {
    Collection<Category> getAllCategories();
}
