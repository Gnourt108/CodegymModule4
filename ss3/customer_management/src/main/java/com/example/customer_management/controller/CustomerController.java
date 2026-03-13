package com.example.customer_management.controller;


import com.example.customer_management.entity.Customer;
import com.example.customer_management.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @ModelAttribute("hobbies")
    public String[] loadHobbies(){
        return new String[]{"Music", "Travel", "Reading", "Football", "Gaming"};
    }


    @GetMapping
    private String showCustomerList(Model model){
        model.addAttribute("customers", customerService.findAll());
        return "list";
    }

    @GetMapping("/addForm")
    private String showAddForm(Model model){
        model.addAttribute("customer", new Customer());
        return "add";
    }

    @PostMapping("/add")
    public String add(Customer customer, RedirectAttributes redirectAttributes){
        boolean result = customerService.add(customer);
        if(result){
            redirectAttributes.addFlashAttribute("message", "Add customer successfully!");
            redirectAttributes.addFlashAttribute("type", "success");
        }
        else{
            redirectAttributes.addFlashAttribute("message", "Add customer failed");
            redirectAttributes.addFlashAttribute("type", "danger");
        }
        return "redirect:list";
    }
}
