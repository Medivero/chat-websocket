package com.example.demo.utils;


import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class jwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtFunctions funcs;


    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain fc) throws ServletException, IOException {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")){
            String token =authHeader.substring(7);
            try {
                if(funcs.validateToken(token)){
                    String name = funcs.getNameFromToken(token);
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(name,null, Collections.emptyList());
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (JwtException ex){
                res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "some problems with jwt");
                return;
            }
        }
        fc.doFilter(req,res);

    }

}
