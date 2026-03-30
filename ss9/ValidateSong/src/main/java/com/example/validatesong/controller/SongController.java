package com.example.validatesong.controller;

import com.example.validatesong.entity.Song;
import com.example.validatesong.service.SongService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/songs")
public class SongController {
    @Autowired
    private SongService songService;

    @GetMapping
    public String showList(Model model){
        model.addAttribute("songs", songService.findAll());
        return "index";
    }

    @GetMapping("/add")
    public String showAdd(Model model){
        model.addAttribute("song", new Song());
        return "add";
    }

    @PostMapping("/add")
    public String addSong(@Valid @ModelAttribute("song")Song song, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return "add";
        }
        songService.save(song);
        return "redirect:/songs";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Integer id, Model model){
        Song song = songService.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy bài hát"));
        model.addAttribute("song", song);
        return "edit";
    }

    @PostMapping("/edit/{id}")
    public String editForm(@PathVariable Integer id,
                           @Valid @ModelAttribute("song")Song song,
                           BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return "edit";
        }
        song.setId(id);
        songService.save(song);
        return "redirect:/songs";
    }
}
