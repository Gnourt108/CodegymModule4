package com.example.calculator;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/calculator")
public class CalculatorController {

    @GetMapping
    public String showForm(){
        return "index";
    }

    @PostMapping
    public String calculate(@RequestParam(name = "num1")double num1, @RequestParam(name = "num2")double num2, @RequestParam(name = "operator")String operator, Model model){
        double result;
        switch (operator){
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1*num2;
                break;
            case "/":
                if(num2 == 0){
                    model.addAttribute("error", "Không thể chia cho 0");
                    return "index";
                }
                result = num1 / num2;
                break;
            default:
                model.addAttribute("error", "Phép toán không hợp lệ");
                return "index";
        }

        model.addAttribute("result", result);
        model.addAttribute("num1", num1);
        model.addAttribute("num2", num2);
        model.addAttribute("operator", operator);

        return "index";
    }
}
