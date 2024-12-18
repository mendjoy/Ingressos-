package io.github.mendjoy.controller;

import io.github.mendjoy.dto.event.EventTicketDTO;
import io.github.mendjoy.dto.response.ResponseApi;
import io.github.mendjoy.service.EventTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event/ticket")
public class EventTicketController {

    @Autowired
    private EventTicketService eventTicketService;

    @PostMapping
    ResponseEntity<ResponseApi> createEventTickets(@RequestBody List<EventTicketDTO> eventTicketDTOS){
        List<EventTicketDTO> savedTickets = eventTicketService.createEventTicket(eventTicketDTOS);
        ResponseApi responseApi = new ResponseApi(HttpStatus.CREATED, "", false, savedTickets);
        return ResponseEntity.status(responseApi.getStatus()).body(responseApi);
    }

}
