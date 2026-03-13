package com.example.changemoney.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping ("/change")
public class ConvertController {
    @GetMapping ("")
    public String showList(){
        return "layout";
    }
    @PostMapping ("/convert")
    public String convert(@RequestParam(name="usd") double usd,
                               @RequestParam(name="rate") double rate,
                               Model model){
        double vnd=usd*rate;
        model.addAttribute("usd",usd);
        model.addAttribute("rate",rate);
        model.addAttribute("vnd", vnd);
        return "layout";

    }
}
