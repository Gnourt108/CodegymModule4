package com.example.blog.service;



import com.example.blog.entity.Post;

import java.util.List;

public interface IPostService {
    List<Post> findAll();
    void addPost(Post post);
    void deletePost(int id);
//    void updateProduct(Product product);
    Post findPostById(int id);
    List<Post> findByTitle(String keyword);
}
