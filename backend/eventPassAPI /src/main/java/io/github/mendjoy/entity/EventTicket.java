package io.github.mendjoy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "event_ticket_types")
public class EventTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "ticket_type_id")
    private Integer ticketTypeId;

    private Double price;

    @Column(name = "available_quantity")
    private Integer availableQuantity;

    public EventTicket() {
    }

    public EventTicket(Integer eventId, Integer ticketTypeId, Double price, Integer availableQuantity) {
        this.eventId = eventId;
        this.ticketTypeId = ticketTypeId;
        this.price = price;
        this.availableQuantity = availableQuantity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public Integer getTicketTypeId() {
        return ticketTypeId;
    }

    public void setTicketTypeId(Integer ticketTypeId) {
        this.ticketTypeId = ticketTypeId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }
}
