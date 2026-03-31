package com.example.book.repository;

import com.example.book.dto.BookDTO;
import com.example.book.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookRepository extends JpaRepository<Book, Integer> {
}
