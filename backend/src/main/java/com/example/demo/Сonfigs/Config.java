package com.example.demo.Сonfigs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class Config {
    @Bean
    public SecurityFilterChain chain(HttpSecurity http) throws Exception{
        http.cors().and().csrf().disable().
                authorizeHttpRequests(auth -> auth.requestMatchers("/**").permitAll()
                        .anyRequest().authenticated());
        return http.build();
    }
}
