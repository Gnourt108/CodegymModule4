package com.example.blog.service;


import com.example.blog.entity.Post;
import com.example.blog.repository.IPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService implements IPostService {
    @Autowired
    private IPostRepository postRepository;
    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public void addPost(Post post) {
        postRepository.save(post);
    }

    @Override
    public void deletePost(int id) {
        postRepository.deleteById(id);
    }

    @Override
    public Post findPostById(int id) {
        return postRepository.findById(id).orElse(null);
    }

    @Override
    public List<Post> findByTitle(String keyword) {
        return postRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
