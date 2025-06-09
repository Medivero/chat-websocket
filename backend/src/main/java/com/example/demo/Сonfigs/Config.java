package com.example.demo.Сonfigs;

import com.example.demo.utils.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class Config {

    @Autowired
    JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain chain(HttpSecurity http) throws Exception{
        http.cors().and().csrf().disable().
                authorizeHttpRequests(auth -> auth.requestMatchers("/api/user/createUser","/api/user/loginUser","/**").permitAll()
                        .anyRequest().authenticated()).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
