package io.github.mendjoy.repository;

import io.github.mendjoy.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {

    public Event findById(int id);
}
