package com.example.book.controller;

import com.example.book.exception.InvalidBorrowCodeException;
import com.example.book.exception.OutOfStockException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalHandlerException {
    @ExceptionHandler(OutOfStockException.class)
    public String handleOutOfStockException(){
        return "error";
    }

    @ExceptionHandler(InvalidBorrowCodeException.class)
    public String handleInvalidCode(){
        return "error";
    }
}
