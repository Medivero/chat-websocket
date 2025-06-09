package com.example.demo.controllers;

import com.example.demo.classes.LoginUser;
import com.example.demo.classes.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.utils.JwtFunctions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/user")
public class UserController {
    UserRepository repo;
    BCryptPasswordEncoder bp = new BCryptPasswordEncoder();
    public UserController(UserRepository repo) {
        this.repo = repo;
    }
    @Autowired
    JwtFunctions funcs;

    @CrossOrigin
    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody User user){
        if (repo.existsByName(user.getName())){
            return ResponseEntity.badRequest().body("User already exists");
        }
        else{
            String hashpassword = bp.encode(user.getPassword());
            user.setPassword(hashpassword);
            repo.save(user);
            String token = funcs.generateToken(user.getName());
            return ResponseEntity.ok(Collections.singletonMap("token",token));
        }
    }
    @CrossOrigin
    @PostMapping("/loginUser")
    public ResponseEntity<?> loginUser(@RequestBody LoginUser user){
        if (repo.existsByName(user.getName())){
            User curruser = repo.getUserByName(user.getName());
            if (bp.matches(user.getPassword(),curruser.getPassword())){
                String token = funcs.generateToken(user.getName());
                return ResponseEntity.ok(Collections.singletonMap("token",token));
            }
            else{
                return ResponseEntity.badRequest().body("Wrong password");
            }
        }
        else{
            return ResponseEntity.badRequest().body("User not found");
        }
    }
}
