package com.example.poststorage.controller;

import com.example.poststorage.model.Mail;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/settings")
public class MailController {

    private Mail currentSettings = new Mail("English", 10, true, "Best regards,\nGnourt!");

    @ModelAttribute("mailSettings")
    public Mail populateMail() {
        return currentSettings;
    }

    @GetMapping
    public String showSettings() {
        return "settings";
    }

    @PostMapping
    public String updateSettings(@ModelAttribute("mailSettings") Mail submitted, RedirectAttributes redirectAttributes) {
        currentSettings = submitted;
        redirectAttributes.addFlashAttribute("successMessage", "Settings updated successfully!");
        return "redirect:/settings";
    }
}
