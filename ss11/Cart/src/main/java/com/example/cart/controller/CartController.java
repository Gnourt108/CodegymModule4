package com.example.cart.controller;

import com.example.cart.entity.CartItem;
import com.example.cart.entity.Product;
import com.example.cart.service.ProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@Controller
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private ProductService productService;

    private Map<Integer, CartItem> getCart(HttpSession session){
        Map<Integer, CartItem> cartItem = (Map<Integer, CartItem>) session.getAttribute("cart");
        if(cartItem == null){
            cartItem = new LinkedHashMap<>();
            session.setAttribute("cart", cartItem);
        }
        return cartItem;
    }

    @GetMapping("")
    public String viewCart(HttpSession session, Model model){
        Map<Integer, CartItem> cart = getCart(session);
        double total = 0;
        for (CartItem item : cart.values()){
            total += item.getSubtotal();
        }

        model.addAttribute("cart", cart);
        model.addAttribute("total", total);
        return "cart";
    }

    @PostMapping("/add/{id}")
    public String addToCart(@PathVariable int id, HttpSession session){
        Map<Integer, CartItem> cart = getCart(session);
        Product product = productService.findById(id).orElseThrow();
        if(cart.containsKey(id)){
            cart.get(id).setQuantity(cart.get(id).getQuantity() + 1);
        }else{
            cart.put(id, new CartItem(product, 1));
        }
        return "redirect:/cart";
    }

    @PostMapping("/update")
    public String updateCart(@RequestParam int productId,
                             @RequestParam int quantity,
                             HttpSession session){
        Map<Integer, CartItem> cart = getCart(session);
        if(quantity <= 0){
            cart.remove(productId);
        }else{
            cart.get(productId).setQuantity(quantity);
        }
        return "redirect:/cart";
    }

    @GetMapping("/remove/{id}")
    public String removeFromCart(@PathVariable int id, HttpSession session){
        getCart(session).remove(id);
        return "redirect:/cart";
    }

}
