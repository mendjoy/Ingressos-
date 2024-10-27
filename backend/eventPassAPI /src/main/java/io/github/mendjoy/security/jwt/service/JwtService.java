package io.github.mendjoy.security.jwt.service;

import io.github.mendjoy.dto.user.UserAuthDTO;
import io.github.mendjoy.entity.User;
import io.github.mendjoy.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
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

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserAuthDTO authenticate(String email, String password){
        User user = userRepository.findByEmail(email);
        boolean admin = false;

        if(user == null){
            throw new UsernameNotFoundException("Email não cadastrado!");
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new BadCredentialsException("Senha incorreta!");
        }

        String token = generateToken(user);

        if(user.getRole().getRole() > 0){
            admin = true;
        }

        return new UserAuthDTO(token, user.getUsername(), admin);
    }

    private SecretKey getSecretKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(User user){

        try {

            LocalDateTime dateExp = LocalDateTime.now().plusMinutes(expirationTime);
            Date data = Date.from(dateExp.atZone(ZoneId.systemDefault()).toInstant());

            Map<String, Object> claims = new HashMap<>();
            claims.put("email", user.getEmail());

            return Jwts.builder()
                       .claims(claims)
                       .subject(user.getUsername())
                       .expiration(data)
                       .issuedAt(new Date())
                       .signWith(getSecretKey())
                       .compact();

        }catch (RuntimeException exception){
            throw new RuntimeException("Erro ao gerar Token", exception);
        }
    }

    public boolean validateToken(String token){
        try {
            Jwts.parser().verifyWith(getSecretKey()).build().parse(token);
            return true;
        }catch (ExpiredJwtException exception){
            return false;
        }
    }

    public String getUsername(String token){
        return Jwts.parser()
                   .verifyWith(getSecretKey())
                   .build()
                   .parseSignedClaims(token).getPayload()
                   .getSubject();
    }

}
