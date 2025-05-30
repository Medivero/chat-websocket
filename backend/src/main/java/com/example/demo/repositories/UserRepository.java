package com.example.demo.repositories;

import com.example.demo.classes.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    boolean existsByName(String name);
    User getUserByName(String name);
}
