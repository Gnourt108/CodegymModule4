package com.example.productmanagement.service;

import com.example.productmanagement.entity.Product;

import java.util.List;

public interface IProductService {
    List<Product> findAll();
    boolean addProduct(Product product);
    boolean deleteProduct(int id);
    boolean updateProduct(Product product);
    Product findProductById(int id);
    List<Product> searchByName(String keyword);
}
