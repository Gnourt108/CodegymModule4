package com.example.practice_1.service;

import com.example.practice_1.entity.Category;
import com.example.practice_1.repository.CategoryRepository;

import java.util.List;

public class ProductTypeService implements IProductTypeService{
    CategoryRepository productTypeRepository = new CategoryRepository();
    @Override
    public List<Category> findAll() {
        return productTypeRepository.findAll();
    }
}
