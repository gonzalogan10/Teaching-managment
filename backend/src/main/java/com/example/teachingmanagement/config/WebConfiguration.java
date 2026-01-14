package com.example.teachingmanagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {


    /**
     * Configure CORS mappings to allow requests from frontend applications.
     * It allows requests from React and Vite development servers.
     * Necessary for enabling cross-origin requests between frontend and backend during development.
     * @param registry, to configure CORS settings
     */
    public void configureCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173") // React + Vite
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}