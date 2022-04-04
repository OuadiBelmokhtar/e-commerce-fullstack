package me.obelmokhtar.productcataloguebackend.service;

import me.obelmokhtar.productcataloguebackend.dao.ProductRepository;
import me.obelmokhtar.productcataloguebackend.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
@Transactional
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Collection<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
