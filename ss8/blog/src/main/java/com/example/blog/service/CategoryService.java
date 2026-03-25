package com.example.blog.service;

import com.example.blog.entity.Category;
import com.example.blog.entity.Post;
import com.example.blog.repository.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

}
