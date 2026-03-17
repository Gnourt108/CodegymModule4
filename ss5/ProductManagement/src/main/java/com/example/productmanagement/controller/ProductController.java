package com.example.productmanagement.controller;


import com.example.productmanagement.entity.Product;
import com.example.productmanagement.service.IProductService;
import com.example.productmanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.management.modelmbean.ModelMBeanOperationInfo;
import java.util.List;

@Controller
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping
    public String showList(@RequestParam(value = "keyword", defaultValue = "")String keyword, Model model){
        List<Product> products;
        if(!keyword.isEmpty()){
            products = productService.searchByName(keyword);
        }else{
            products = productService.findAll();
        }
        model.addAttribute("products", products);
        model.addAttribute("keyword", keyword);
        return "product/list";
    }

    @GetMapping("/add")
    public String showAddForm(Model model){
        model.addAttribute("product", new Product());
        return "product/add";
    }
    @GetMapping("/detail")
    public String showDetail(@RequestParam("id")int id, Model model){
        model.addAttribute("product", productService.findProductById(id));
        return "product/detail";
    }
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable("id") int id, Model model){
        model.addAttribute("product", productService.findProductById(id));
        return "product/edit";
    }


    @PostMapping("/add")
    public String addProduct(@ModelAttribute Product product, RedirectAttributes redirectAttributes){
        if(productService.addProduct(product)){
            redirectAttributes.addFlashAttribute("mess","is add success");
            return "redirect:/products";
        }else{
            redirectAttributes.addFlashAttribute("mess","is add failed");
            return "redirect:/products";
        }
    }

    @PostMapping("/delete")
    public String deleteProduct(@RequestParam("deleteId")int id, RedirectAttributes redirectAttributes){
        if(productService.deleteProduct(id)){
            redirectAttributes.addFlashAttribute("mess", "Deleted successfully!");
            return "redirect:/products";
        }else{
            redirectAttributes.addFlashAttribute("mess","Deleted failed!");
            return "redirect:/products";
        }
    }

    @PostMapping("/edit")
    public String updateProduct(@ModelAttribute Product product, RedirectAttributes redirectAttributes){
        if(productService.updateProduct(product)){
            redirectAttributes.addFlashAttribute("mess", "Updated successfully!");
            return "redirect:/products";
        }else{
            redirectAttributes.addFlashAttribute("mess","Update failed!");
            return "redirect:/products";
        }
    }
}
