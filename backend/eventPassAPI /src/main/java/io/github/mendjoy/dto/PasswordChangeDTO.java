package io.github.mendjoy.dto;

public class PasswordChangeDTO {

    private String password;
    private String newPassword;
    private String confirmNewPassword;

    public PasswordChangeDTO() {
    }

    public PasswordChangeDTO(String password, String newPassword, String confirmNewPassword) {
        this.password = password;
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmNewPassword() {
        return confirmNewPassword;
    }

    public void setConfirmNewPassword(String confirmNewPassword) {
        this.confirmNewPassword = confirmNewPassword;
    }
}
