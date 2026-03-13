package com.example.customer_management.repository;

import com.example.customer_management.entity.Customer;
import org.glassfish.jersey.internal.inject.Custom;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomerRepository {
    List<Customer> customers = new ArrayList<>();

    CustomerRepository() {
        customers.add(new Customer(1, "Nguyen Van A", "a@gmail.com", "Da Nang", "VIP",
                new String[]{"Music", "Travel"}));

        customers.add(new Customer(2, "Tran Thi B", "b@gmail.com", "Ha Noi", "NORMAL",
                new String[]{"Reading"}));

        customers.add(new Customer(3, "Le Van C", "c@gmail.com", "Ho Chi Minh", "NORMAL",
                new String[]{"Football", "Gaming"}));
    }

    public List<Customer> findAll() {
        return customers;
    }

    public boolean add(Customer customer){
        return customers.add(customer);
    }
}
