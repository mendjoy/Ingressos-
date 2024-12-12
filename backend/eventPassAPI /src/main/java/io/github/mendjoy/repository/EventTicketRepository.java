package io.github.mendjoy.repository;

import io.github.mendjoy.entity.EventTicketType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventTicketTypeRepository extends JpaRepository<EventTicketType, Integer> {
}
