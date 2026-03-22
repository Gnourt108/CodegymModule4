package com.example.productmanagement.repository;

import com.example.productmanagement.entity.Product;
import com.example.productmanagement.util.ConnectionUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class ProductRepository implements IProductRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Product> findAll() {
        TypedQuery<Product> query = entityManager.createQuery("FROM Product", Product.class);
        return query.getResultList();
    }

    @Transactional
    @Override
    public void addProduct(Product product) {
       entityManager.persist(product);
    }

    @Transactional
    @Override
    public void deleteProduct(int id) {
        Product product = entityManager.find(Product.class, id);
        if(product!=null){
            entityManager.remove(product);
        }
    }

    @Transactional
    @Override
    public void updateProduct(Product product) {
       entityManager.merge(product);
    }

    @Override
    public Product findProductById(int id) {
        return entityManager.find(Product.class, id);
    }

    @Override
    public List<Product> searchByName(String keyword) {
        String query = "SELECT p FROM Product p where p.name like :keyword";
        return entityManager.createQuery(query, Product.class)
                .setParameter("keyword", keyword)
                .getResultList();
    }
}
