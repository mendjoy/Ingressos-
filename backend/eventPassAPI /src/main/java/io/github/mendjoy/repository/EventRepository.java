package io.github.mendjoy.repository;

import io.github.mendjoy.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface EventRepository extends JpaRepository<Event, Integer> {

    public Event findByIdAndEventDateGreaterThanEqual(Integer id, LocalDateTime currentDate);

    Page<Event> findByEventDateGreaterThanEqual(LocalDateTime dateTime, Pageable pageable);

}
