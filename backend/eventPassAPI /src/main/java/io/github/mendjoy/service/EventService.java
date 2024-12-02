package io.github.mendjoy.service;

import io.github.mendjoy.dto.event.EventDTO;
import io.github.mendjoy.entity.Event;
import io.github.mendjoy.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    private LocalDateTime getCurrentDate(){
        return LocalDate.now().atStartOfDay();
    }

    public void save(EventDTO eventDTO){
        System.out.println(eventDTO.toString());
        Event event = new Event(eventDTO.getName(),
                                eventDTO.getDescription(),
                                eventDTO.getEventDate(),
                                eventDTO.getStartTime(),
                                eventDTO.getEndTime(),
                                eventDTO.getLocation(),
                                eventDTO.getCapacity(),
                                eventDTO.getUrlImage());

        eventRepository.save(event);
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

        return new EventDTO(event.getId(),
                            event.getName(),
                            event.getDescription(),
                            event.getEventDate(),
                            event.getStartTime(),
                            event.getEndTime(),
                            event.getLocation(),
                            event.getCapacity(),
                            event.getUrlImage());

    }

    public Page<Event> searchEventsByName(String name, int page){
        Pageable pageable = PageRequest.of(page, 10);
        return eventRepository.findByNameContainingIgnoreCaseAndEventDateGreaterThanEqual(name, getCurrentDate(), pageable);
    }

}
