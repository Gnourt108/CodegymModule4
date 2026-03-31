package com.example.book.exception;

public class InvalidBorrowCodeException extends RuntimeException{
    public InvalidBorrowCodeException(String message){
        super(message);
    }
}
