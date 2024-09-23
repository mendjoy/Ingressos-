package io.github.mendjoy.dto;

import java.util.Date;

public class UserRegisterDTO {
    private String name;
    private String username;
    private String email;
    private Date birthDate;
    private String phone;
    private Boolean admin;
    private String password;
    private String confirmPassword;

    public UserRegisterDTO() {

    }

    public UserRegisterDTO(String name, String username, String email, Date birthDate, String phone, Boolean admin, String password, String confirmPassword) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.birthDate = birthDate;
        this.phone = phone;
        this.admin = admin;
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

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
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
