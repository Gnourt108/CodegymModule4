package com.example.validationformdangki.controller;

import com.example.validationformdangki.entity.User;
import com.example.validationformdangki.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FormController {
    @Autowired
    private IUserService userService;

    @GetMapping("/register")
    public String showForm(Model model){
        model.addAttribute("user", new User());
        return "index";
    }

    @PostMapping("/register")
    public String submitForm(@Valid @ModelAttribute("user")User user,
                             BindingResult bindingResult,
                             Model model){
        if(bindingResult.hasErrors()){
            return "index";
        }
        userService.save(user);
        model.addAttribute("user", user);
        return "result";
    }
}
