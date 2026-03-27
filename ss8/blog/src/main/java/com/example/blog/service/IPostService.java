package com.example.blog.service;



import com.example.blog.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface IPostService {
    List<Post> findAll();
    void addPost(Post post);
    void deletePost(int id);
//    void updateProduct(Product product);
    Post findPostById(int id);
    Page<Post> searchPosts(String keyword, Integer categoryId, LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable);
}
