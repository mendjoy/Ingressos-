package io.github.mendjoy.enums.enums;

public enum UserRole {
    ADMIN(true),
    USER(false);

    private Boolean role;

    UserRole(Boolean role) {
        this.role = role;
    }

    public String getRole() {
        return role ? "admin" : "user";
    }
}
