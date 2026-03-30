package com.example.validationformdangki.service;

import com.example.validationformdangki.entity.User;

import java.util.List;

public interface IUserService {
    void save(User user);
    List<User> findAll();
}
