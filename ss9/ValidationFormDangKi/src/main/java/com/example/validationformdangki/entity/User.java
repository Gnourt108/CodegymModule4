package com.example.validationformdangki.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "First name không được để trống")
    @Size(min = 5, max = 45, message = "First name phải từ 5 đến 45 ký tự")
    private String firstname;

    @NotBlank(message = "Last name không được để trống")
    @Size(min = 5, max = 45, message = "Last name phải từ 5 đến 45 ký tự")
    private String lastname;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(
            regexp = "^(0|\\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-9])[0-9]{7}$",
            message = "Số điện thoại không đúng định dạng"
    )
    private String phoneNumber;

    @NotNull(message = "Tuổi không được để trống")
    @Min(value = 18, message = "Tuổi phải từ 18 trở lên")
    private Integer age;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

}
