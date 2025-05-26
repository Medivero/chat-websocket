package com.example.demo.utils;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;

import java.util.Date;

@Component
public class JwtFunctions {
    private final String secret_key = "sheldon_kuper";
    private final long EXP_TIME = 1000 * 60 * 60 *10;
    private Date exp_date = new Date(System.currentTimeMillis() + EXP_TIME);
    public String generateToken(String name){
        return Jwts.builder().setSubject(name)
                .setIssuedAt(new Date()).setExpiration(exp_date)
                .signWith(SignatureAlgorithm.HS256,secret_key).compact();
    }
    public String  getNameFromToken(String token){
        return Jwts.parser().setSigningKey(secret_key).parseClaimsJwt(token).getBody().getSubject();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(secret_key).parseClaimsJwt(token);
            return true;
        }
        catch (JwtException ex){
            System.out.println(ex);
            return false;
        }
    }
}
