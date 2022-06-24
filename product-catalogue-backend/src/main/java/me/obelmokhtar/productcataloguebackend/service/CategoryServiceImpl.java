package me.obelmokhtar.productcataloguebackend.service;

import me.obelmokhtar.productcataloguebackend.dao.CategoryRepository;
import me.obelmokhtar.productcataloguebackend.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;


@Service
@Transactional
public class CategoryServiceImpl implements  CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Collection<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
