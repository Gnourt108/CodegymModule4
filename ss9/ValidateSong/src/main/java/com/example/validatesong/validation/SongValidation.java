package com.example.validatesong.validation;

import com.example.validatesong.dto.SongDto;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class SongValidation implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return SongDto.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        SongDto dto = (SongDto) target;

        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            errors.rejectValue("title", null, "Tên bài hát không được để trống");

        } else if (dto.getTitle().length() > 800) {
            errors.rejectValue("title", null, "Tên bài hát không vượt quá 800 ký tự");

        } else if (dto.getTitle().matches(".*[@;,.=\\-+].*")) {
            errors.rejectValue("title", null,
                    "Tên bài hát không được chứa ký tự đặc biệt như @ ; , . = - +");
        }

        if (dto.getArtist() == null || dto.getArtist().isBlank()) {
            errors.rejectValue("artist", null, "Tên nghệ sĩ không được để trống");

        } else if (dto.getArtist().length() > 300) {
            errors.rejectValue("artist", null, "Tên nghệ sĩ không vượt quá 300 ký tự");

        } else if (dto.getArtist().matches(".*[@;,.=\\-+].*")) {
            errors.rejectValue("artist", null,
                    "Tên nghệ sĩ không được chứa ký tự đặc biệt như @ ; , . = - +");
        }

        if (dto.getGenre() == null || dto.getGenre().isBlank()) {
            errors.rejectValue("genre", null, "Thể loại không được để trống");

        } else if (dto.getGenre().length() > 1000) {
            errors.rejectValue("genre", null, "Thể loại không vượt quá 1000 ký tự");

        } else if (dto.getGenre().matches(".*[@;.=\\-+].*")) {  // ← không có dấu phẩy
            errors.rejectValue("genre", null,
                    "Thể loại không được chứa ký tự đặc biệt như @ ; . = - +");
        }
    }
}
