package io.github.mendjoy.exception;

import io.github.mendjoy.dto.response.ResponseApi;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ResponseApi> handleUserNotFoundException(UsernameNotFoundException exception){
        ResponseApi responseApi = new ResponseApi(HttpStatus.NOT_FOUND, exception.getMessage(), true);
        return new ResponseEntity<>(responseApi, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseApi> handleBadCredentialsException(BadCredentialsException exception) {
        ResponseApi responseApi = new ResponseApi(HttpStatus.UNAUTHORIZED, exception.getMessage(), true);
        return new ResponseEntity<>(responseApi, HttpStatus.UNAUTHORIZED);
    }
}
