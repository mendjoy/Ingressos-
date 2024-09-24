package io.github.mendjoy.controller;

import io.github.mendjoy.entity.User;
import io.github.mendjoy.dto.UserRegisterDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

            User user = userService.save(userRegisterDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");

        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}

