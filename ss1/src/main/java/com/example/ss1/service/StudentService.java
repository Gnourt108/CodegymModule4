package com.example.ss1.service;

import com.example.ss1.entity.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService implements IStudentService{
    private static List<Student> studentList = new ArrayList<>();

    static {
        studentList.add(new Student(1, "Nguyen Van A"));
        studentList.add(new Student(2, "Tran Thi B"));
        studentList.add(new Student(3, "Le Van C"));
    }

    @Override
    public List<Student> findAll() {
        return studentList;
    }

    @Override
    public void add(Student student) {
        studentList.add(student);
    }

    @Override
    public Student findById(int id) {
        for (Student student : studentList) {
            if(student.getId() == id){
                return student;
            }
        }
        return null;
    }
}
