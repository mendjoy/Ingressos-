package io.github.mendjoy.service;

import io.github.mendjoy.dto.event.EventRegisterDTO;
import io.github.mendjoy.entity.Event;
import io.github.mendjoy.repository.EventRepository;
import io.github.mendjoy.repository.UserRepository;
import io.github.mendjoy.security.jwt.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public void save(EventRegisterDTO eventRegisterDTO){
        System.out.println(eventRegisterDTO.toString());
        Event event = new Event(eventRegisterDTO.getName(),
                                eventRegisterDTO.getDescription(),
                                eventRegisterDTO.getEventDate(),
                                eventRegisterDTO.getStartTime(),
                                eventRegisterDTO.getEndTime(),
                                eventRegisterDTO.getLocation(),
                                eventRegisterDTO.getCapacity(),
                                eventRegisterDTO.getUrlImage());

        eventRepository.save(event);
    }
}
