package com.example.cart.controller;

import com.example.cart.entity.CartItem;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Map;

@ControllerAdvice
public class CartCountController {

    @ModelAttribute("cartCount")
    public int cartCount(HttpSession session){
        Map<Integer, CartItem> cart =
                (Map<Integer, CartItem>) session.getAttribute("cart");

        if (cart == null) return 0;

        return cart.size();
    }
}
