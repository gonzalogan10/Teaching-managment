package com.example.teachingmanagement.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF for REST API usage
            .csrf(csrf -> csrf.disable())

            // Allow H2 console to be displayed in browser (uses iframes)
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))

            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                // Allow H2 console (development only)
                .requestMatchers("/h2/**").permitAll()

                // Allow user creation without authentication
                .requestMatchers("/api/users").permitAll()

                // Secure all other endpoints
                .anyRequest().authenticated()
            )

            // Use HTTP Basic authentication
            .httpBasic();

        return http.build();
    }

    // Password hashing using BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
