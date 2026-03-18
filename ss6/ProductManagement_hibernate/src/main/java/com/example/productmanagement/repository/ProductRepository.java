package com.example.productmanagement.repository;

import com.example.productmanagement.entity.Product;
import com.example.productmanagement.util.ConnectionUtil;
import jakarta.persistence.TypedQuery;
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

    private static List<Product> products = new ArrayList<>();

    @Override
    public List<Product> findAll() {
        Session session = ConnectionUtil.sessionFactory.openSession();
        TypedQuery<Product> typedQuery = session.createNativeQuery("select * from product", Product.class);
        List<Product> productList = typedQuery.getResultList();
        session.close();
        return productList;
    }

    @Override
    public void addProduct(Product product) {
        Session session = ConnectionUtil.sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.save(product);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }

    @Override
    public void deleteProduct(int id) {
        Session session = ConnectionUtil.sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try{
            Product product = session.get(Product.class, id);
            if(product != null){
                session.delete(product);
            }
            transaction.commit();
        }catch (Exception e){
            transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
    }

    @Override
    public void updateProduct(Product product) {
       Session session = ConnectionUtil.sessionFactory.openSession();
       Transaction transaction = session.beginTransaction();
       try{
           if(product != null){
               session.update(product);
           }
           transaction.commit();
       }catch (Exception e){
           transaction.rollback();
           e.printStackTrace();
       }finally {
           session.close();
       }
    }

    @Override
    public Product findProductById(int id) {
        Session session = ConnectionUtil.sessionFactory.openSession();
        return session.find(Product.class, id);
    }

    @Override
    public List<Product> searchByName(String keyword) {
        Session session = ConnectionUtil.sessionFactory.openSession();
        List<Product> productList = null;
        try {
            String hql = "from Product where name like :keyword";
            productList = session.createQuery(hql, Product.class)
                    .setParameter("keyword", "%" + keyword + "%")
                    .getResultList();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            session.close();
        }
        return productList;
    }
}
