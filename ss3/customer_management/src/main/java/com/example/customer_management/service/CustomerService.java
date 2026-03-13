package com.example.customer_management.service;

import com.example.customer_management.entity.Customer;
import com.example.customer_management.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public boolean add(Customer customer){
        return customerRepository.add(customer);
    }
}
