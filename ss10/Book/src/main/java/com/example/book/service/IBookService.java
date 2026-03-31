package com.example.book.service;

import com.example.book.dto.BookDTO;
import com.example.book.entity.Book;

import java.util.List;
import java.util.Optional;

public interface IBookService {
    List<Book> findAll();
    void add(Book book);
    Optional<Book> findById(int id);
    String borrowBook(int bookId);
    void returnBook(String borrowCode);
}
