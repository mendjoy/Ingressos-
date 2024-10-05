package io.github.mendjoy.controller;

import io.github.mendjoy.dto.AuthResponseDTO;
import io.github.mendjoy.dto.UserLoginDTO;
import io.github.mendjoy.dto.UserRegisterDTO;
import io.github.mendjoy.dto.UserProfileDTO;
import io.github.mendjoy.security.jwt.service.JwtService;
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
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

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
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody UserLoginDTO userLoginDTO){
        AuthResponseDTO authResponseDTO = jwtService.authenticate(userLoginDTO.getEmail(), userLoginDTO.getPassword());

        return ResponseEntity.ok(authResponseDTO);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> profile(@RequestHeader("Authorization") String authorizationHeader){
        UserProfileDTO userProfileDTO = userService.getDetailsUser(authorizationHeader);
        return ResponseEntity.ok(userProfileDTO);
    }

}

