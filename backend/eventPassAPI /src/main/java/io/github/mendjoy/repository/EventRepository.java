package io.github.mendjoy.repository;

import io.github.mendjoy.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    public Event findById(int id);

    Page<Event> findByEventDateGreaterThanEqual(LocalDateTime dateTime, Pageable pageable);

}
