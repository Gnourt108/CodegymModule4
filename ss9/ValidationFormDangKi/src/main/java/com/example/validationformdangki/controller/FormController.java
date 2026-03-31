package com.example.validationformdangki.controller;

import com.example.validationformdangki.dto.UserDto;
import com.example.validationformdangki.entity.User;
import com.example.validationformdangki.service.IUserService;
import com.example.validationformdangki.validation.UserValidation;
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
        model.addAttribute("userDto", new UserDto());
        return "index";
    }

    @PostMapping("/register")
    public String submitForm(@Valid @ModelAttribute("userDto")UserDto userDto,
                             BindingResult bindingResult,
                             Model model){
        UserValidation validation = new UserValidation();
        validation.validate(userDto, bindingResult);

        if (bindingResult.hasErrors()) {
            return "index";
        }

        // Map DTO → Entity
        User user = new User();
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setAge(userDto.getAge());
        user.setEmail(userDto.getEmail());

        userService.save(user);
        model.addAttribute("user", user);
        return "result";
    }
}
