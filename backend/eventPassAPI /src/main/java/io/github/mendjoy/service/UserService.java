package io.github.mendjoy.service;

import io.github.mendjoy.domain.entity.User;
import io.github.mendjoy.dto.UserRegisterDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import io.github.mendjoy.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User save(UserRegisterDTO userRegisterDTO) {

        if (!userRegisterDTO.getPassword().equals(userRegisterDTO.getConfirmPassword())) {
            throw new IllegalArgumentException("As senhas não conferem!");
        }

        if(userRepository.existsByEmail(userRegisterDTO.getEmail())){
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        if(userRepository.existsByUsername(userRegisterDTO.getUsername())){
            throw new IllegalArgumentException("Username já cadastrado!");
        }

        User user = new User(
                userRegisterDTO.getName(),
                userRegisterDTO.getUsername(),
                userRegisterDTO.getEmail(),
                userRegisterDTO.getBirthDate(),
                userRegisterDTO.getPhone(),
                userRegisterDTO.getAdmin(),
                passwordEncoder.encode(userRegisterDTO.getPassword())
        );

        return userRepository.save(user);
    }
}