package io.github.mendjoy.dto;

public class AuthResponseDTO {

    private String token;
    private String username;
    private boolean isAdmin;

    public AuthResponseDTO() {
    }

    public AuthResponseDTO(String token, String username, boolean isAdmin) {
        this.token = token;
        this.username = username;
        this.isAdmin  = isAdmin;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
