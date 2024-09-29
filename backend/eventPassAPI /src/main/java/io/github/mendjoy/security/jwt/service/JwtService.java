package io.github.mendjoy.security.jwt.service;

import io.github.mendjoy.dto.AuthResponseDTO;
import io.github.mendjoy.entity.User;
import io.github.mendjoy.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${security.jwt.key-signature}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long expirationTime;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponseDTO authenticate(String email, String password){
        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new UsernameNotFoundException("Usuário não encontrado!");
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new BadCredentialsException("Senha incorreta!");
        }

        String token = generateToken(user);
        return new AuthResponseDTO(token, user.getUsername());
    }

    public String generateToken(User user){
        LocalDateTime dateExp = LocalDateTime.now().plusMinutes(expirationTime);
        Date data = Date.from(dateExp.atZone(ZoneId.systemDefault()).toInstant());

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                   .claims(claims)
                   .subject(user.getUsername())
                   .expiration(data)
                   .issuedAt(new Date())
                   .signWith(key)
                   .compact();
    }


}
