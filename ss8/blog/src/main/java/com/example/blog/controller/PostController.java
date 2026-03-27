package com.example.blog.controller;


import com.example.blog.entity.Category;
import com.example.blog.entity.Post;
import com.example.blog.service.AuthorService;
import com.example.blog.service.CategoryService;
import com.example.blog.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private IPostService postService;
    @Autowired
    private AuthorService authorService;
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public String showList(
            @RequestParam(value = "page", required = false, defaultValue = "0")int page,
            @RequestParam(value = "keyword", defaultValue = "")String keyword,
            @RequestParam(value = "categoryId", required = false)Integer categoriesId,
            @RequestParam(value = "fromDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(value = "toDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
            Model model){
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(page, 2, sort);
        LocalDateTime from = (fromDate != null) ? fromDate.atStartOfDay() : null;
        LocalDateTime to = (toDate != null) ? toDate.atTime(23, 59, 59) : null;

        Page<Post> postPage = postService.searchPosts(keyword, categoriesId, from, to, pageable);

        model.addAttribute("postsPage", postPage);
        model.addAttribute("keyword", keyword);
        model.addAttribute("categoryId", categoriesId);
        model.addAttribute("fromDate", fromDate);
        model.addAttribute("toDate", toDate);
        model.addAttribute("categories", categoryService.findAll());
        return "post/list";
    }

    @GetMapping("/add")
    public String showAddForm(Model model){
        model.addAttribute("post", new Post());
        model.addAttribute("authors", authorService.findAll());
        model.addAttribute("categories", categoryService.findAll());
        return "post/add";
    }

    @PostMapping("/add")
    public String addPost(@ModelAttribute Post post, RedirectAttributes redirectAttributes){
        try{
            postService.addPost(post);
            redirectAttributes.addFlashAttribute("mess","is add success");
        }catch(Exception e){
            redirectAttributes.addFlashAttribute("mess","is add failed");
        }
        return "redirect:/posts";
    }

    @GetMapping("/detail")
    public String showDetail(@RequestParam("id")int id, Model model){
        model.addAttribute("post", postService.findPostById(id));
        return "post/detail";
    }

    @PostMapping("/delete")
    public String deletePost(@RequestParam("deleteId")int id, RedirectAttributes redirectAttributes){
        try{
            postService.deletePost(id);
            redirectAttributes.addFlashAttribute("mess", "Deleted successfully!");
        }catch(Exception e){
            redirectAttributes.addFlashAttribute("mess","Deleted failed!");
        }
        return "redirect:/posts";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable("id") int id, Model model){
        model.addAttribute("post", postService.findPostById(id));
        model.addAttribute("authors", authorService.findAll());
        model.addAttribute("categories", categoryService.findAll());
        return "post/edit";
    }

    @PostMapping("/edit")
    public String updatePost(@ModelAttribute Post post, RedirectAttributes redirectAttributes){
        try{
            postService.addPost(post);
            redirectAttributes.addFlashAttribute("mess", "Updated successfully!");
        }catch (Exception e){
            redirectAttributes.addFlashAttribute("mess","Update failed!");
        }
        return "redirect:/posts";
    }
}
