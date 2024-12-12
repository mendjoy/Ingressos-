package io.github.mendjoy.dto.event;

public class EventTicketDTO {

    private Integer id;
    private Integer eventId;
    private Integer ticketTypeId;
    private Double price;
    private Integer availableQuantity;


    public EventTicketDTO() {
    }

    public EventTicketDTO(Integer id, Integer eventId, Integer ticketTypeId, Double price, Integer availableQuantity) {
        this.id = id;
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
