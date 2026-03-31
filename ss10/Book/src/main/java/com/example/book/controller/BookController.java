package com.example.book.controller;

import com.example.book.dto.BookDTO;
import com.example.book.entity.Book;
import com.example.book.service.BookService;
import com.example.book.validation.BookValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public String listBooks(Model model) {
        model.addAttribute("books", bookService.findAll());
        return "index";
    }

    @GetMapping("/{id}")
    public String bookDetail(@PathVariable int id, Model model){
        Book book = bookService.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sách"));
        model.addAttribute("book", book);
        return "detail";
    }

    @GetMapping("/add")
    public String showAdd(Model model){
        model.addAttribute("bookDto", new BookDTO());
        return "book-add";
    }

    @PostMapping("/add")
    public String addBook(@ModelAttribute("bookDto")BookDTO bookDTO,
                          BindingResult bindingResult,
                          Model model){
        BookValidation validation = new BookValidation();
        validation.validate(bookDTO,bindingResult);

        if(bindingResult.hasErrors()){
            return "book-add";
        }

        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setQuantity(bookDTO.getQuantity());
        bookService.add(book);

        return "redirect:/books";
    }

    @PostMapping("/{id}/borrow")
    public String borrowBook(@PathVariable int id, Model model){
        String borrowCode = bookService.borrowBook(id);
        Book book = bookService.findById(id).orElseThrow();
        model.addAttribute("book", book);
        model.addAttribute("borrowCode", borrowCode);
        return "borrow";
    }

    @GetMapping("/form")
    public String showReturnForm(){
        return "return";
    }

    @PostMapping("/return")
    public String returnBook(@RequestParam String borrowCode, Model model){
        bookService.returnBook(borrowCode);
        model.addAttribute("message", "Trả sách thành công");
        return "return";
    }
}
