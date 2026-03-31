package com.example.book.validation;

import com.example.book.dto.BookDTO;
import com.example.book.entity.Book;
import jakarta.validation.Validation;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class BookValidation implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return BookDTO.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        BookDTO bookDTO = (BookDTO) target;
        if(bookDTO.getTitle() == null || bookDTO.getTitle().isBlank()){
            errors.rejectValue("title", null, "Tên sách không được để trống");
        }
        if (bookDTO.getAuthor() == null || bookDTO.getAuthor().isBlank()) {
            errors.rejectValue("author", null, "Tên tác giả không được để trống");
        }

        if (bookDTO.getQuantity() < 0) {
            errors.rejectValue("quantity", null, "Số lượng không được âm");
        }
    }
}
