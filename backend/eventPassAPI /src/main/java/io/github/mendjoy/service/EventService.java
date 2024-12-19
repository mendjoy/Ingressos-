package io.github.mendjoy.service;

import io.github.mendjoy.dto.event.EventDTO;
import io.github.mendjoy.entity.Event;
import io.github.mendjoy.entity.EventTicket;
import io.github.mendjoy.repository.EventRepository;
import io.github.mendjoy.repository.EventTicketRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventTicketRepository eventTicketRepository;

    private LocalDateTime getCurrentDate(){
        return LocalDate.now().atStartOfDay();
    }

    public EventDTO save(EventDTO eventDTO){

        Event event = new Event(eventDTO.getName(),
                                eventDTO.getDescription(),
                                eventDTO.getEventDate(),
                                eventDTO.getStartTime(),
                                eventDTO.getEndTime(),
                                eventDTO.getLocation(),
                                eventDTO.getCapacity(),
                                eventDTO.getUrlImage());

        Event savedEvent = eventRepository.save(event);

        List<EventTicket> eventTickets = eventTicketRepository.findByEventId(savedEvent.getId());
        
        return new EventDTO(savedEvent.getId(),
                            savedEvent.getName(),
                            savedEvent.getDescription(),
                            savedEvent.getEventDate(),
                            savedEvent.getStartTime(),
                            savedEvent.getEndTime(),
                            savedEvent.getLocation(),
                            savedEvent.getCapacity(),
                            savedEvent.getUrlImage(),
                            eventTickets
        );
    }

    public Page<Event> getEvents(int page){
        Pageable pageable = PageRequest.of(page, 10);
        return eventRepository.findByEventDateGreaterThanEqual(getCurrentDate(), pageable);
    }

    public EventDTO getEventById(int id){
        Event event = eventRepository.findByIdAndEventDateGreaterThanEqual(id, getCurrentDate());

        if(event == null){
            throw new EntityNotFoundException("Evento não encontrado!");
        }

        List<EventTicket> eventTickets = eventTicketRepository.findByEventId(event.getId());
        return new EventDTO(event.getId(),
                            event.getName(),
                            event.getDescription(),
                            event.getEventDate(),
                            event.getStartTime(),
                            event.getEndTime(),
                            event.getLocation(),
                            event.getCapacity(),
                            event.getUrlImage(),
                            eventTickets);

    }

    public Page<Event> searchEventsByName(String name, int page){
        Pageable pageable = PageRequest.of(page, 10);
        return eventRepository.findByNameContainingIgnoreCaseAndEventDateGreaterThanEqual(name, getCurrentDate(), pageable);
    }

}
