package com.example.ss1.controller;

import com.example.ss1.entity.Student;
import com.example.ss1.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private IStudentService studentService;
    @GetMapping("")
    public String listStudent(Model model){
        model.addAttribute("students", studentService.findAll());
        return "list";
    }

    @GetMapping("/add")
    public String showAddForm(){
        return "add";
    }

    @PostMapping("/add")
    public String add(@RequestParam (name = "id")int id, @RequestParam(name = "name")String name, Model model){
        studentService.add(new Student(id, name));
        return "redirect:/student";
    }

    @GetMapping("/detail")
    public String showDetail(@RequestParam(name = "id")int id, Model model){
        model.addAttribute("student",studentService.findById(id));
        return "detail";
    }
}
