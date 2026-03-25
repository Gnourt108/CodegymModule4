package com.example.blog.repository;


import com.example.blog.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByTitleContainingIgnoreCase(String keyword);
}
