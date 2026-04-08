package com.example.blog.controller.api;

import com.example.blog.entity.Post;
import com.example.blog.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostApiController {
    @Autowired
    private IPostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getAll() {
        return ResponseEntity.ok(postService.findAll());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Post>> getByCategory(@PathVariable int categoryId){
        List<Post> posts = postService.findPostsByCategoryId(categoryId);
        if(posts.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<Post>> getPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5")int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Post> postPage = postService.searchPosts("", null, null, null, pageable);
        return ResponseEntity.ok(postPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getById(@PathVariable int id){
        Post post = postService.findPostById(id);
        if(post == null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(post);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Post>> search(
            @RequestParam(defaultValue = "")String keyword,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
            @RequestParam(required = false)Integer categoryId){
        LocalDateTime from = (fromDate != null) ? fromDate.atStartOfDay() : null;
        LocalDateTime to   = (toDate != null)   ? toDate.atTime(23, 59, 59) : null;

        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
        Page<Post> page = postService.searchPosts(keyword, categoryId, from, to, pageable);
        return ResponseEntity.ok(page.getContent());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable int id){
        Post post = postService.findPostById(id);
        if(post == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy bài viết có ID: "+id);
        }
        try {
            postService.deletePost(id);
            return ResponseEntity.ok("Xóa bài viết thành công!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Xóa bài viết thất bại: "+e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable int id, @RequestBody Post postRequest){
        Post post = postService.findPostById(id);
        if(post == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy bài viết có ID: "+id);
        }

        try {
            post.setTitle(postRequest.getTitle());
            post.setContent(postRequest.getContent());
            post.setCategories(postRequest.getCategories());
            post.setAuthors(postRequest.getAuthors());
            post.setUpdatedAt(LocalDateTime.now());
            postService.addPost(post);
            return ResponseEntity.ok(post);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cập nhật bài viết thất bại: "+e.getMessage());
        }
    }

    @PostMapping()
    public ResponseEntity<?> createPost(@RequestBody Post post){
        try {
            post.setCreatedAt(LocalDateTime.now());
            post.setUpdatedAt(LocalDateTime.now());
            postService.addPost(post);
            return ResponseEntity.ok(post);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm sách thất bại: "+e.getMessage());
        }
    }
}