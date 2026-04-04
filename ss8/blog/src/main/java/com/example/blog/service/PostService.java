package com.example.blog.service;


import com.example.blog.entity.Post;
import com.example.blog.repository.IPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public List<Post> findPostsByCategoryId(int id) {
        return postRepository.findPostsBy(id);
    }

    @Override
    public Page<Post> searchPosts(String keyword, Integer categoryId, LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable) {
        boolean hasCategory = categoryId != null;
        boolean hasDate = fromDate != null && toDate != null;

        if(hasCategory && hasDate){
            return postRepository.findByTitleContainingIgnoreCaseAndCategories_IdAndCreatedAtBetween(keyword, categoryId, fromDate, toDate, pageable);
        } else if (hasCategory) {
            return postRepository.findByTitleContainingIgnoreCaseAndCategories_Id(keyword, categoryId, pageable);
        } else if (hasDate) {
            return postRepository.findByTitleContainingIgnoreCaseAndCreatedAtBetween(keyword, fromDate, toDate, pageable);
        }else{
            return postRepository.findByTitleContainingIgnoreCase(keyword, pageable);
        }
    }
}
