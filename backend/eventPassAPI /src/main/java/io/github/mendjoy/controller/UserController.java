package io.github.mendjoy.controller;

import io.github.mendjoy.response.ResponseApi;
import io.github.mendjoy.dto.*;
import io.github.mendjoy.dto.user.UserLoginDTO;
import io.github.mendjoy.dto.user.UserPasswordChangeDTO;
import io.github.mendjoy.dto.user.UserProfileDTO;
import io.github.mendjoy.dto.user.UserRegisterDTO;
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
            AuthResponseDTO authResponseDTO = jwtService.authenticate(userRegisterDTO.getEmail(), userRegisterDTO.getPassword());

            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseApi(HttpStatus.CREATED, "Registro Criado com sucesso!", authResponseDTO));

        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<ResponseApi> login(@Valid @RequestBody UserLoginDTO userLoginDTO){
        AuthResponseDTO authResponseDTO = jwtService.authenticate(userLoginDTO.getEmail(), userLoginDTO.getPassword());
        return ResponseEntity.ok(new ResponseApi(HttpStatus.OK, "", authResponseDTO ));
    }

    @GetMapping("/profile")
    public ResponseEntity<ResponseApi> profile(@RequestHeader("Authorization") String authorizationHeader){
        UserProfileDTO userProfileDTO = userService.getDetailsUser(authorizationHeader);
        return ResponseEntity.ok(new ResponseApi(HttpStatus.OK, "", userProfileDTO ));
    }

    @PatchMapping("/profile")
    public ResponseEntity<ResponseApi> updateProfile(@RequestHeader("Authorization") String authorizationHeader, @RequestBody UserProfileDTO userProfileDTO){
        userService.updateUserProfile(userProfileDTO);
        return ResponseEntity.ok(new ResponseApi(HttpStatus.OK, "Alterado com sucesso!"));
    }

    @PatchMapping("/profile/change")
    public ResponseEntity<ResponseApi> updatePassword(@RequestHeader("Authorization") String authorizationHeader, @RequestBody UserPasswordChangeDTO passwordChangeDTO){
        userService.updatePassword(authorizationHeader, passwordChangeDTO);
        return ResponseEntity.ok(new ResponseApi(HttpStatus.OK, "Senha alterada com sucesso!"));
    }

}

