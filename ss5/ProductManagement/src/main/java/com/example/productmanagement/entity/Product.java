package com.example.productmanagement.entity;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Product {
    private int id;
    private String name;
    private double price;
    private String type;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;


    public Product() {
    }

    public Product(int id, String name, double price, String type, Date createdAt) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
