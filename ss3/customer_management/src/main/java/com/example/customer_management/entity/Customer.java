package com.example.customer_management.entity;

public class Customer {
    private int id;
    private String name;
    private String email;
    private String address;
    private String type;
    private String[] hobbies;

    public Customer() {
    }

    public Customer(int id, String name, String email, String address, String type, String[] hobbies) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.type = type;
        this.hobbies = hobbies;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String[] getHobbies() {
        return hobbies;
    }

    public void setHobbies(String[] hobbies) {
        this.hobbies = hobbies;
    }
}
