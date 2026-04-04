package com.example.blog.repository;
import com.example.blog.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface IPostRepository extends JpaRepository<Post, Integer> {

    Page<Post> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);
    Page<Post> findByTitleContainingIgnoreCaseAndCategories_Id(String keyword, Integer categoryId, Pageable pageable);
    Page<Post> findByTitleContainingIgnoreCaseAndCategories_IdAndCreatedAtBetween(String keyword, Integer categoriesId, LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable);
    Page<Post> findByTitleContainingIgnoreCaseAndCreatedAtBetween(
            String keyword, LocalDateTime fromDate, LocalDateTime toDate,
            Pageable pageable);
    @Query("SELECT p FROM Post p WHERE p.categories.id = :id")
    List<Post> findPostsBy(@Param("id") int id);
}
