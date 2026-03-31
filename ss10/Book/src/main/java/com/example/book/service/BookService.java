package com.example.book.service;

import com.example.book.dto.BookDTO;
import com.example.book.entity.Book;
import com.example.book.entity.BorrowRecord;
import com.example.book.exception.InvalidBorrowCodeException;
import com.example.book.exception.OutOfStockException;
import com.example.book.repository.IBookRepository;
import com.example.book.repository.IBorrowRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BookService implements IBookService{

    @Autowired
    private IBookRepository bookRepository;

    @Autowired
    private IBorrowRecordRepository borrowRecordRepository;

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public void add(Book book) {
        bookRepository.save(book);
    }

    @Override
    public Optional<Book> findById(int id) {
        return bookRepository.findById(id);
    }

    @Override
    public String borrowBook(int bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Không tìm thấy sách"));

        if(book.getQuantity() <= 0){
            throw new OutOfStockException("Sách "+book.getTitle()+" đã hết, không thể mượn thêm!");
        }

        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        String borrowCode = String.format("%05d", new Random().nextInt(100000));
        BorrowRecord record = new BorrowRecord( bookId, borrowCode);

        borrowRecordRepository.save(record);

        return borrowCode;
    }

    @Override
    public void returnBook(String borrowCode) {
        BorrowRecord borrowRecord = borrowRecordRepository.findByBorrowCode(borrowCode).orElseThrow(() -> new InvalidBorrowCodeException("Mã mượn "+borrowCode+" không tồn tại!"));
        Book book = bookRepository.findById(borrowRecord.getBookId()).orElseThrow(() -> new RuntimeException("Không tìm thấy sách"));
        book.setQuantity(book.getQuantity()+ 1);
        bookRepository.save(book);
        borrowRecordRepository.delete(borrowRecord);
    }
}
