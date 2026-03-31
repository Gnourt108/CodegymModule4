package com.example.validationformdangki.validation;

import com.example.validationformdangki.dto.UserDto;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class UserValidation implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return UserDto.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserDto dto = (UserDto) target;

        if (dto.getFirstname() == null || dto.getFirstname().isBlank()) {
            errors.rejectValue("firstName", null, "First name không được để trống");

        } else if (dto.getFirstname().length() < 5 || dto.getFirstname().length() > 45) {
            errors.rejectValue("firstName", null, "First name phải từ 5 đến 45 ký tự");
        }

        if (dto.getLastname() == null || dto.getLastname().isBlank()) {
            errors.rejectValue("lastName", null, "Last name không được để trống");

        } else if (dto.getLastname().length() < 5 || dto.getLastname().length() > 45) {
            errors.rejectValue("lastName", null, "Last name phải từ 5 đến 45 ký tự");
        }

        if (dto.getPhoneNumber() == null || dto.getPhoneNumber().isBlank()) {
            errors.rejectValue("phoneNumber", null, "Số điện thoại không được để trống");

        } else if (!dto.getPhoneNumber().matches(
                "^(0|\\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-9])[0-9]{7}$")) {
            errors.rejectValue("phoneNumber", null, "Số điện thoại không đúng định dạng");
        }

        if (dto.getAge() == null) {
            errors.rejectValue("age", null, "Tuổi không được để trống");

        } else if (dto.getAge() < 18) {
            errors.rejectValue("age", null, "Tuổi phải từ 18 trở lên");
        }

        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            errors.rejectValue("email", null, "Email không được để trống");

        } else if (!dto.getEmail().matches("^[\\w.+-]+@[\\w-]+\\.[\\w.]+$")) {
            errors.rejectValue("email", null, "Email không đúng định dạng");
        }
    }
}
