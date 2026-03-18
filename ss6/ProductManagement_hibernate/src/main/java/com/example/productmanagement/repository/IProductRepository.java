package com.example.productmanagement.repository;

import com.example.productmanagement.entity.Product;

import java.util.List;

public interface IProductRepository {
    List<Product> findAll();
    void addProduct(Product product);
    void deleteProduct(int id);
    void updateProduct(Product product);
    Product findProductById(int id);
    List<Product> searchByName(String keyword);
}
