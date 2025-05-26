package com.example.demo.classes;

import jakarta.persistence.*;

@Entity
@Table(name = "user-table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String name;
    public String password;
    public String role = "user";

    public User(Long id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
    public User(){

    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
