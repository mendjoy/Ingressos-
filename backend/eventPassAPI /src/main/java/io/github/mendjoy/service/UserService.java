package io.github.mendjoy.service;

import io.github.mendjoy.dto.UserProfileDTO;
import io.github.mendjoy.dto.UserRegisterDTO;
import io.github.mendjoy.entity.User;
import io.github.mendjoy.repository.UserRepository;
import io.github.mendjoy.security.jwt.service.JwtService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    JwtService jwtService;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public User save(UserRegisterDTO userRegisterDTO) {

        if(userRepository.existsByEmail(userRegisterDTO.getEmail())){
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        if(userRepository.existsByUsername(userRegisterDTO.getUsername())){
            throw new IllegalArgumentException("Username já cadastrado!");
        }

        if (!userRegisterDTO.getPassword().equals(userRegisterDTO.getConfirmPassword())) {
            throw new IllegalArgumentException("As senhas não conferem!");
        }

        User user = new User(
                userRegisterDTO.getName(),
                userRegisterDTO.getUsername(),
                userRegisterDTO.getEmail(),
                userRegisterDTO.getBirthDate(),
                userRegisterDTO.getPhone(),
                userRegisterDTO.getRole(),
                passwordEncoder.encode(userRegisterDTO.getPassword())
        );

        return userRepository.save(user);
    }


    public UserProfileDTO getDetailsUser(String token){
        String username = jwtService.getUsername(token.replace("Bearer ", ""));
        User user = userRepository.findByUsername(username);

        if(user != null){
            return new UserProfileDTO(user.getName(),
                                      user.getUsername(),
                                      user.getBirthDate(),
                                      user.getEmail(),
                                      user.getPhone());
        }else{
            throw  new UsernameNotFoundException("Usuário não encontrado");
        }
    }

}