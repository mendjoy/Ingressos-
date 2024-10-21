package io.github.mendjoy.enums.enums;

public enum UserRole {
    ADMIN(true),
    USER(false);

    private final boolean isAdmin;

    UserRole(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public boolean isAdmin() {
        return isAdmin;
    }
}
