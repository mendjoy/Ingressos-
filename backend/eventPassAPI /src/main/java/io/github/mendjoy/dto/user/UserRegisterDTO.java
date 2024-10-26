package io.github.mendjoy.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public class UserRegisterDTO {

    @NotBlank(message = "Nome é obrigatório!")
    private String name;

    @NotBlank(message = "Username é obrigatório!")
    private String username;

    @Email(message = "E-mail inválido!")
    @NotBlank(message = "E-mail é obrigatório!")
    private String email;

    @NotNull(message = "Data de nascimento é obrigatória!")
    private Date birthDate;

    private String phone;

    @NotBlank(message = "Senha é obrigatória")
    private String password;

    @NotBlank(message = "Confirmação de senha é obrigatória!")
    private String confirmPassword;

    public UserRegisterDTO() {

    }

    public UserRegisterDTO(String name, String username, String email, Date birthDate, String phone, String password, String confirmPassword) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.birthDate = birthDate;
        this.phone = phone;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

}
