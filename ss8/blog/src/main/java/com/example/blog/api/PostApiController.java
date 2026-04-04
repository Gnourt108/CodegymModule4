package com.example.blog.api;

import com.example.blog.entity.Post;
import com.example.blog.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostApiController {
    @Autowired
    private IPostService postService;

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Post>> getByCategory(@PathVariable int categoryId){
        List<Post> posts = postService.findPostsByCategoryId(categoryId);
        if(posts.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getById(@PathVariable int id){
        Post post = postService.findPostById(id);
        if(post == null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(post);
    }
}
