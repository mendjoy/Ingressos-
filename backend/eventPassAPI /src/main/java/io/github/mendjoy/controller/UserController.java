package io.github.mendjoy.controller;

import io.github.mendjoy.dto.UserLoginDTO;
import io.github.mendjoy.entity.User;
import io.github.mendjoy.dto.UserRegisterDTO;
import io.github.mendjoy.security.jwt.JwtUtil;
import io.github.mendjoy.service.CustomUserDetailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import io.github.mendjoy.service.UserService;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRegisterDTO userRegisterDTO, BindingResult result) {

        try {

            if (result.hasErrors()) {
                String errorMessages = result.getFieldErrors()
                                             .stream()
                                             .map(DefaultMessageSourceResolvable::getDefaultMessage)
                                             .collect(Collectors.joining("\n"));

                return ResponseEntity.badRequest().body(errorMessages);
            }

            userService.save(userRegisterDTO);

            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");

        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO userLoginDTO){
        String token = jwtUtil.authenticate(userLoginDTO.getEmail(), userLoginDTO.getPassword());
        return ResponseEntity.ok(token);
    }
}

