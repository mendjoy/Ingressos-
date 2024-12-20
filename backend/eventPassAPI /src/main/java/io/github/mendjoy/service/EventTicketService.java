package io.github.mendjoy.service;

import io.github.mendjoy.dto.event.EventTicketDTO;
import io.github.mendjoy.entity.EventTicket;
import io.github.mendjoy.repository.EventTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventTicketService {

    @Autowired
    private EventTicketRepository eventTicketRepository;

    public void saveEventTicket(Integer eventId, List<EventTicketDTO> eventTicketDTOS) {

        if (eventId == null) {
            throw new IllegalArgumentException("O ID do evento não pode ser nulo.");
        }

        List<EventTicket> tickets = eventTicketDTOS.stream()
                .map(dto -> new EventTicket(
                        eventId,
                        dto.getTicketTypeId(),
                        dto.getPrice(),
                        dto.getAvailableQuantity()
                ))
                .collect(Collectors.toList());

        eventTicketRepository.saveAll(tickets);
    }

    public List<EventTicketDTO> getEventTicketsByEventId(Integer id){
        List<EventTicket> eventTickets = eventTicketRepository.findByEventId(id);

        return eventTickets.stream()
                           .map(tickets -> new EventTicketDTO(
                                   tickets.getId(),
                                   tickets.getEventId(),
                                   tickets.getTicketTypeId(),
                                   tickets.getPrice(),
                                   tickets.getAvailableQuantity()
                           )).collect(Collectors.toList());
    }
}
