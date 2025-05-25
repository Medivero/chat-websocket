package com.example.demo.controllers;

import com.example.demo.classes.Message;
import com.example.demo.repositories.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class ChatController {
    public MessageRepository repo;
    private final SimpMessagingTemplate temp;

    public ChatController(SimpMessagingTemplate temp, MessageRepository repo) {
        this.temp = temp;
        this.repo = repo;
    }
    @MessageMapping("/send")
    public void sendMessage(Message mes){
        try{
            repo.save(mes);
            temp.convertAndSend("/topic/messages",mes);

        } catch (Exception ex){
            System.out.println(ex);
        }

    }
}
