package io.github.mendjoy.controller;

import io.github.mendjoy.dto.event.EventRegisterDTO;
import io.github.mendjoy.dto.response.ResponseApi;
import io.github.mendjoy.entity.Event;
import io.github.mendjoy.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping
    public ResponseEntity<ResponseApi> getEvents(@RequestParam(defaultValue = "0") int page){
        Page<Event> events = eventService.getEvents(page);
        return ResponseEntity.ok(new ResponseApi(HttpStatus.OK, "", false, events));
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseApi> createEvent(@RequestBody EventRegisterDTO eventRegisterDTO){
        eventService.save(eventRegisterDTO);
        ResponseApi responseApi = new ResponseApi(HttpStatus.CREATED, "Evento cadastrado com sucesso!", false, eventRegisterDTO);
        return ResponseEntity.status(responseApi.getStatus()).body(responseApi);
    }

}
