package com.example.blog.repository;

import com.example.blog.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAuthorRepository extends JpaRepository<Author, Integer> {
}
