package io.github.mendjoy.dto.user;

public class UserPasswordChangeDTO {

    private String password;
    private String newPassword;
    private String confirmNewPassword;

    public UserPasswordChangeDTO() {
    }

    public UserPasswordChangeDTO(String password, String newPassword, String confirmNewPassword) {
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
