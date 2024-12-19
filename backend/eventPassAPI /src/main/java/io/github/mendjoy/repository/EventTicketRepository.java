package io.github.mendjoy.repository;

import io.github.mendjoy.entity.EventTicket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventTicketRepository extends JpaRepository<EventTicket, Integer> {

    List<EventTicket> findByEventId(int eventId);
}
