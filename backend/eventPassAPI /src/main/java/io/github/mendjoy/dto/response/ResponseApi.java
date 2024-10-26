package io.github.mendjoy.dto.response;

import org.springframework.http.HttpStatus;

public class ResponseApi {
    private HttpStatus status;
    private String message;
    private boolean error;
    private Object data;

    public ResponseApi() {
    }

    public ResponseApi(HttpStatus status, String message, boolean error) {
        this.status = status;
        this.message = message;
        this.error = error;
    }

    public ResponseApi(HttpStatus status, String message, boolean error, Object data) {
        this.status = status;
        this.message = message;
        this.error = error;
        this.data = data;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
