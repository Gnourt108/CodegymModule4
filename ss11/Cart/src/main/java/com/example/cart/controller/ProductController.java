package com.example.cart.controller;

import com.example.cart.entity.Product;
import com.example.cart.service.IProductService;
import com.example.cart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping("")
    public String showProducts(Model model){
        model.addAttribute("products", productService.findAll());
        return "product_list";
    }

    @GetMapping("/{id}")
    public String showDetail(@PathVariable ("id")Integer id, Model model){
        Product product = productService.findById(id).orElseThrow(()-> new RuntimeException("Không tìm thấy sản phẩm"));
        model.addAttribute("product", product);
        return "product_detail";
    }
}
