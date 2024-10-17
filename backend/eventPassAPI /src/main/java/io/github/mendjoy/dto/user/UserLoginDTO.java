package io.github.mendjoy.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserLoginDTO {

    @Email(message = "E-mail inválido!")
    @NotBlank(message = "E-mail é obrigatório!")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    private String password;

    public UserLoginDTO() {

    }

    public UserLoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public @Email(message = "E-mail inválido!") @NotBlank(message = "E-mail é obrigatório!") String getEmail() {
        return email;
    }

    public void setEmail(@Email(message = "E-mail inválido!") @NotBlank(message = "E-mail é obrigatório!") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Senha é obrigatória") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Senha é obrigatória") String password) {
        this.password = password;
    }
}
