package com.example.productmanagement.service;

import com.example.productmanagement.entity.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProductService implements IProductService{

    private static List<Product> products = new ArrayList<>();

    static {
        if (products.isEmpty()) {
            products.add(new Product(1, "Iphone 15", 1200, "Phone", new Date()));
            products.add(new Product(2, "Samsung S24", 1100, "Phone", new Date()));
            products.add(new Product(3, "Xiaomi 14", 800, "Phone", new Date()));
        }
    }

    @Override
    public List<Product> findAll() {
        return products;
    }

    @Override
    public boolean addProduct(Product product) {
        return products.add(product);
    }

    @Override
    public boolean deleteProduct(int id) {
        for (Product p : products){
            if (p.getId() == id){
                return products.remove(p);
            }
        }
        return false;
    }

    @Override
    public boolean updateProduct(Product product) {
        for (Product p : products){
            if(p.getId() == product.getId()){
                p.setName(product.getName());
                p.setPrice(product.getPrice());
                p.setType(product.getType());
                p.setCreatedAt(product.getCreatedAt());
                return true;
            }
        }
        return false;
    }

    @Override
    public Product findProductById(int id) {
        for (Product p : products){
            if(p.getId() == id){
                return p;
            }
        }
        return null;
    }

    @Override
    public List<Product> searchByName(String keyword) {
        List<Product> result = new ArrayList<>();
        for (Product p : products) {
            if (p.getName().toLowerCase().contains(keyword.toLowerCase())) {
                result.add(p);
            }
        }
        return result;
    }
}
