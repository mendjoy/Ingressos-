package io.github.mendjoy.controller;

import io.github.mendjoy.dto.response.ResponseApi;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/event/ticket")
public class EventTicketType {

    @PostMapping
    ResponseEntity<ResponseApi> createEventTickets(){
        
    }

}
