package io.github.mendjoy.config;

import io.github.mendjoy.repository.UserRepository;
import io.github.mendjoy.security.jwt.service.JwtAuthFilter;
import io.github.mendjoy.security.jwt.service.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(JwtService jwtService, UserRepository userRepository, CorsConfigurationSource corsConfigurationSource) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.corsConfigurationSource = corsConfigurationSource;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http ) throws Exception {
        JwtAuthFilter jwtAuthFilter = new JwtAuthFilter(jwtService, userRepository);

        return  http.csrf(AbstractHttpConfigurer::disable)
                    .cors(cors -> cors.configurationSource(corsConfigurationSource))
                    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .authorizeHttpRequests(authorize -> {
                        authorize.requestMatchers("/user/login", "/user/register").permitAll();
                        authorize.anyRequest().authenticated();
                    })
                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                    .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
