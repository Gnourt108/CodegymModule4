package com.example.validatesong.controller;

import com.example.validatesong.dto.SongDto;
import com.example.validatesong.entity.Song;
import com.example.validatesong.service.SongService;
import com.example.validatesong.validation.SongValidation;
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
        model.addAttribute("songDto", new SongDto());
        return "add";
    }

    @PostMapping("/add")
    public String addSong(@Valid @ModelAttribute("songDto")SongDto songDto, BindingResult bindingResult){

        SongValidation songValidation = new SongValidation();
        songValidation.validate(songDto, bindingResult);

        if(bindingResult.hasErrors()){
            return "add";
        }

        Song song = new Song();
        song.setTitle(songDto.getTitle());
        song.setArtist(songDto.getArtist());
        song.setGenre(songDto.getGenre());
        songService.save(song);
        return "redirect:/songs";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Integer id, Model model){
        Song song = songService.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy bài hát"));
        SongDto songDto = new SongDto();
        songDto.setTitle(song.getTitle());
        songDto.setArtist(song.getArtist());
        songDto.setGenre(song.getGenre());

        model.addAttribute("songDto", songDto);
        model.addAttribute("songId", song.getId());
        return "edit";
    }

    @PostMapping("/edit/{id}")
    public String editForm(@PathVariable Integer id,
                           @Valid @ModelAttribute("songDto")SongDto songDto,
                           BindingResult bindingResult){
        SongValidation validation = new SongValidation();
        validation.validate(songDto, bindingResult);

        if(bindingResult.hasErrors()){
            return "edit";
        }

        Song song = songService.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy bài hát"));

        song.setTitle(songDto.getTitle());
        song.setArtist(songDto.getArtist());
        song.setGenre(songDto.getGenre());
        songService.save(song);
        return "redirect:/songs";
    }
}
