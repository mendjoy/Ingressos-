package io.github.mendjoy.service;

import io.github.mendjoy.dto.user.UserPasswordChangeDTO;
import io.github.mendjoy.dto.user.UserProfileDTO;
import io.github.mendjoy.dto.user.UserRegisterDTO;
import io.github.mendjoy.entity.User;
import io.github.mendjoy.enums.enums.UserRole;
import io.github.mendjoy.repository.UserRepository;
import io.github.mendjoy.security.jwt.service.JwtService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.BadCredentialsException;
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
    public void save(UserRegisterDTO userRegisterDTO) {

        if(userRepository.existsByEmail(userRegisterDTO.getEmail())){
            throw new DuplicateKeyException("E-mail já cadastrado!");
        }

        if(userRepository.existsByUsername(userRegisterDTO.getUsername())){
            throw new DuplicateKeyException("Username já cadastrado!");
        }

        if (!userRegisterDTO.getPassword().equals(userRegisterDTO.getConfirmPassword())) {
            throw new BadCredentialsException("As senhas não conferem!");
        }

        User user = new User(
                userRegisterDTO.getName(),
                userRegisterDTO.getUsername(),
                userRegisterDTO.getEmail(),
                userRegisterDTO.getBirthDate(),
                userRegisterDTO.getPhone(),
                UserRole.USER,
                passwordEncoder.encode(userRegisterDTO.getPassword())
        );

        userRepository.save(user);
    }

    @Transactional
    public void updateUserProfile(UserProfileDTO userProfileDTO){
        User user = userRepository.findByUsername(userProfileDTO.getUsername());

        if(user != null){
            user.setName(userProfileDTO.getName());
            user.setPhone(userProfileDTO.getPhone());

            userRepository.save(user);
        }else{
            throw  new UsernameNotFoundException("Usuário não encontrado");
        }
    }

    @Transactional
    public void updatePassword(String token, UserPasswordChangeDTO passwordChangeDTO){
        String username = jwtService.getUsername(token);

        User user = userRepository.findByUsername(username);

        if(user != null){
            if(passwordEncoder.matches(passwordChangeDTO.getPassword(), user.getPassword())){
               if(passwordChangeDTO.getNewPassword().equals(passwordChangeDTO.getConfirmNewPassword())){
                    user.setPassword(passwordEncoder.encode(passwordChangeDTO.getNewPassword()));
                    userRepository.save(user);
               }else{
                   throw new BadCredentialsException("As senhas não conferem!");
               }
            }else{
                throw new BadCredentialsException("Senha incorreta!");
            }
        }
    }


    public UserProfileDTO getDetailsUser(String token){
        String username = jwtService.getUsername(token);
        User user = userRepository.findByUsername(username);

        if(user != null){
            return new UserProfileDTO(user.getName(),
                                      user.getUsername(),
                                      user.getBirthDate(),
                                      user.getEmail(),
                                      user.getPhone());
        }else{
            throw new UsernameNotFoundException("Usuário não encontrado");
        }
    }

    @Transactional
    public void deleteUser(String token){
        String username = jwtService.getUsername(token);

        User user = userRepository.findByUsername(username);

        if(user != null){
            userRepository.delete(user);
        }else{
            throw new UsernameNotFoundException("Usuário não encontrado");
        }

    }

}