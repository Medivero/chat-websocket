package com.example.demo.controllers;

import com.example.demo.classes.Message;
import com.example.demo.repositories.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatHistory")
public class ChatHistoryController {
    MessageRepository repo;

    public ChatHistoryController(MessageRepository repo) {
        this.repo = repo;
    }

    @CrossOrigin
    @GetMapping("/getHistory")
    public ResponseEntity<List<Message>> getHistory(){
        return ResponseEntity.ok(repo.findAll());
    }
    @CrossOrigin
    @DeleteMapping("/deleteHistory")
    public ResponseEntity<?> deleteHistory(){
        repo.deleteAll();
        return ResponseEntity.ok("OK");
    }
}
