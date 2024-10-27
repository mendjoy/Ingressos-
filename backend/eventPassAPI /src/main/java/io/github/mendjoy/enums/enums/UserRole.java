package io.github.mendjoy.enums.enums;

public enum UserRole {

    USER(0),
    ADMIN(1);

    private final int role;

    UserRole(int role) {
        this.role = role;
    }

    public int getRole() {
        return role;
    }
}
