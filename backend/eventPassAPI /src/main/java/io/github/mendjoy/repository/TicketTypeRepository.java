package io.github.mendjoy.repository;

import io.github.mendjoy.entity.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketTypeRepository extends JpaRepository<TicketType, Integer> {
}
