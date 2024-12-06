package io.github.mendjoy.controller;

import io.github.mendjoy.dto.response.ResponseApi;
import io.github.mendjoy.entity.TicketType;
import io.github.mendjoy.service.TicketTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketTypeController {

    @Autowired
    private TicketTypeService ticketTypeService;

    @GetMapping
    ResponseEntity<ResponseApi> getTickets(){
         List<TicketType> ticketTypes =  ticketTypeService.getTicketsType();
         ResponseApi responseApi = new ResponseApi(HttpStatus.OK, "", false, ticketTypes);
         return ResponseEntity.ok(responseApi);
    }
}
