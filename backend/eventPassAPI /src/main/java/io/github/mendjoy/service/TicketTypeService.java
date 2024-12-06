package io.github.mendjoy.service;

import io.github.mendjoy.entity.TicketType;
import io.github.mendjoy.repository.TicketTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketTypeService {

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    public List<TicketType> getTicketsType(){
        return ticketTypeRepository.findAll();
    }
}
