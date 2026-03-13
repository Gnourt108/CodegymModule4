package com.example.ss1.service;

import com.example.ss1.entity.Student;

import java.util.List;

public interface IStudentService {
    List<Student> findAll();
    void add(Student student);
    Student findById(int id);
}
