package com.example.book.repository;

import com.example.book.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IBorrowRecordRepository extends JpaRepository<BorrowRecord, Integer> {
    Optional<BorrowRecord> findByBorrowCode(String borrowCode);
}
