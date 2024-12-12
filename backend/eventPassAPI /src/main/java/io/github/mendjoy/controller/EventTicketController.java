package io.github.mendjoy.controller;

import io.github.mendjoy.dto.event.EventTicketDTO;
import io.github.mendjoy.dto.response.ResponseApi;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event/ticket")
public class EventTicketController {

    @PostMapping
    ResponseEntity<ResponseApi> createEventTickets(@RequestBody EventTicketDTO){

    }

}
