package io.github.mendjoy.service;

import io.github.mendjoy.repository.TicketTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventTicketTypeService {

    @Autowired
    private TicketTypeRepository ticketTypeRepository;
}
