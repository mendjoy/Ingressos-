package io.github.mendjoy.dto.user;

import java.util.Date;

public class UserProfileDTO {

    private String name;
    private String username;
    private Date birthDate;
    private String email;
    private String phone;

    public UserProfileDTO() {

    }

    public UserProfileDTO(String name, String username, Date birthDate, String email, String phone) {
        this.name = name;
        this.username = username;
        this.birthDate = birthDate;
        this.email = email;
        this.phone = phone;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }
}
