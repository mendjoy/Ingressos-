package io.github.mendjoy.security.jwt;

import io.github.mendjoy.entity.User;
import io.github.mendjoy.repository.UserRepository;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtUtil {

    private String SECRET_KEY = "your secret key";
    private long EXPIRATION_TIME = 1000 * 60 * 60; //// 1 hora

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String authenticate(String email, String password){
        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new UsernameNotFoundException("Usuário não encontrado!");
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new BadCredentialsException("Senha incorreta");
        }

        return generateToken(user);
    }

    public String generateToken(User user){
        LocalDateTime dateExp = LocalDateTime.now().plusMinutes(EXPIRATION_TIME);
        Date data = Date.from(dateExp.atZone(ZoneId.systemDefault()).toInstant());

        Map<String, Object> claims = new HashMap<>();

        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

        return Jwts.builder()
                .claims(claims)
                .subject(user.getUsername())
                .expiration(data)
                .signWith(key)
                .compact();
    }

}
