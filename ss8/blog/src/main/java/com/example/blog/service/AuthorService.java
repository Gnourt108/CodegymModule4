package com.example.blog.service;

import com.example.blog.entity.Author;
import com.example.blog.entity.Post;
import com.example.blog.repository.IAuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {
    @Autowired
    private IAuthorRepository authorRepository;
    public List<Author> findAll() {
        return authorRepository.findAll();
    }
}
