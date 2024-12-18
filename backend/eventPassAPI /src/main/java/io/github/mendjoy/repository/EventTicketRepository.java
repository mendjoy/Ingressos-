package io.github.mendjoy.repository;

import io.github.mendjoy.entity.EventTicket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventTicketRepository extends JpaRepository<EventTicket, Integer> {
}
