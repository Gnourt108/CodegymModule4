package com.example.sandwich;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("/sandwich")
public class SandwichController {
    List<String> spices = Arrays.asList("Mayonnaise", "Mù tạt", "Tương cà", "Tiêu", "Muối", "Thịt bò", "Phô mai", "Xà lách");

    @GetMapping
    public String home(Model model){
        model.addAttribute("spices", spices);
        return "index";
    }

    @PostMapping("/result")
    public String handleOrder(@RequestParam(name = "toppings")List<String> toppings, Model model){
        model.addAttribute("toppings", toppings);
        return "result";
    }
}
