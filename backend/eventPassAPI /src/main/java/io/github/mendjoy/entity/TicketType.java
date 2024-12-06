package io.github.mendjoy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ticket_types")
public class TicketType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ticket_type")
    private String ticketType;

    public TicketType() {
    }

    public TicketType(Integer id, String ticketType) {
        this.ticketType = ticketType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }
}
