package com.example.practice_1.repository;

import com.example.practice_1.entity.ProductType;

import java.util.List;

public interface IProductTypeRepository {
    List<ProductType> findAll();
}
