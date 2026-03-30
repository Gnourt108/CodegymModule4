package com.example.validationformdangki.repository;

import com.example.validationformdangki.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
}
