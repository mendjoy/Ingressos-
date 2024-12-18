package io.github.mendjoy.service;

import io.github.mendjoy.dto.event.EventTicketDTO;
import io.github.mendjoy.entity.EventTicket;
import io.github.mendjoy.repository.EventTicketRepository;
import io.github.mendjoy.repository.TicketTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventTicketService {

    @Autowired
    private EventTicketRepository eventTicketRepository;

    public List<EventTicketDTO> createEventTicket(List<EventTicketDTO> eventTicketDTOS) {
        List<EventTicket> tickets = eventTicketDTOS.stream()
                .map(dto -> new EventTicket(
                        dto.getId(),
                        dto.getEventId(),
                        dto.getTicketTypeId(),
                        dto.getPrice(),
                        dto.getAvailableQuantity()
                ))
                .collect(Collectors.toList());

        List<EventTicket> savedTickets = eventTicketRepository.saveAll(tickets);

        return savedTickets.stream()
                .map(savedTicket -> new EventTicketDTO(
                        savedTicket.getId(),
                        savedTicket.getEventId(),
                        savedTicket.getTicketTypeId(),
                        savedTicket.getPrice(),
                        savedTicket.getAvailableQuantity()
                ))
                .collect(Collectors.toList());
    }
}
