"use client"

import { useEffect, useState } from "react"
import SuccessMessage from "../../../components/SuccessMessage/SuccessMessage"
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage"

//api
import postData from "../../../service/api/postData"
import getData from "@/service/api/getData"

//icons
import { IoMdAdd } from "react-icons/io"
import { TiDelete } from "react-icons/ti"

const RegisterEvent = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [capacity, setCapacity] = useState(0)
    const [location, setLocation] = useState("")
    const [urlImage, setUrlImage] = useState("")
    const [ticketType, setTicketType] = useState([])
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [tickets, setTickets] = useState([{ ticketTypeId: "", price: "", quantity: "" }])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

        const eventRegister = {
            name,
            description,
            eventDate,
            startTime,
            endTime,
            capacity,
            location,
            urlImage,
        }

        const eventResult = await postData(`/event/register`, eventRegister)

        if (eventResult.error) {
            setErrorMessage(eventResult.message)
        }

        resetForm()

    } catch (error) {

        setErrorMessage(error.message)

    }
  }

    const registerTicketsEvent = () => {

    }

    const resetForm = () => {
        setName("")
        setDescription("")
        setEventDate(0)
        setStartTime(0)
        setEndTime(0)
        setCapacity(0)
        setLocation("")
        setUrlImage("")
        setTickets([{ ticketTypeId: "", price: "", quantity: "" }])
        setTimeout(() => setSuccessMessage(""), 2000)
    }

    const getTicketsType = async () => {

        try {

            const result = await getData("/tickets")

            setTicketType(result.data)

        } catch (error) {

            setErrorMessage(error.message)

        }
    }

    const handleAddTicket = () => {
        const updatedTickets = [...tickets]
        updatedTickets.push({ ticketTypeId: "", price: "", quantity: "" })
        setTickets(updatedTickets)
    }

    const handleRemoveTicket = (index) => {
        const removeTickets = [...tickets]
        removeTickets.splice(index, 1)
        setTickets(removeTickets)
    }
  
    const handleTicketChange = (index, field, value) => {
        const updatedTickets = [...tickets]
        updatedTickets[index][field] = value
        setTickets(updatedTickets)
    }

    useEffect(() => {

        getTicketsType()

    }, [])

    return (
        <div className="formContainer">
            <div className="formAndTickets">
                <form onSubmit={handleSubmit}>
                    {successMessage && <SuccessMessage message={successMessage} />}
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                <h2 className="formTitle">Cadastrar Evento</h2>
                <div className="labelInput">
                    <label>Nome do Evento</label>
                    <input type="text"
                           placeholder="Nome do Evento"
                           value={name}
                           onChange={(e) => {
                                setName(e.target.value)
                                setErrorMessage("")
                            }}
                    />
                </div>
                <div className="labelInput">
                    <label>Descrição</label>
                    <textarea className="noResize"
                            rows={2}
                            cols={30}
                            placeholder="Descrição do evento"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                                setErrorMessage("")
                    }}/>
                </div>
                <div className="labelInput">
                    <label>Data</label>
                    <input type="date"
                           value={eventDate}
                           onChange={(e) => {
                                setEventDate(e.target.value)
                                setErrorMessage("")
                       }}/>
                </div>
                <div className="labelInput">
                    <label>Horário</label>
                    <div className="timeContainer">
                        <input type="time"
                               value={startTime}
                                onChange={(e) => {
                                    setStartTime(e.target.value)
                                    setErrorMessage("")
                            }}/> a
                        <input type="time"
                               value={endTime}
                               onChange={(e) => {
                                    setEndTime(e.target.value)
                                    setErrorMessage("")
                                }}/>
                    </div>
                </div>
                <div className="labelInput">
                    <label>Capacidade máxima</label>
                    <input type="number"
                           placeholder="Capacidade Máxima"
                           value={capacity}
                           onChange={(e) => {
                                setCapacity(e.target.value)
                                setErrorMessage("")
                            }}/>
                </div>
                <div className="labelInput">
                    <label>Local</label>
                    <input type="text"
                           placeholder="Local"
                           value={location}
                           onChange={(e) => {
                                setLocation(e.target.value)
                                setErrorMessage("")
                        }}/>
                </div>
                <div className="labelInput">
                    <label>Url imagem banner</label>
                    <input type="text"
                           placeholder="Url Banner"
                           value={urlImage}
                           onChange={(e) => {
                                setUrlImage(e.target.value)
                                setErrorMessage("")
                        }}/>
                </div>
                <button type="submit" className="blueButton">Cadastrar</button>
            </form>
    
            <div className="ticketsSection">
                <h2 className="sectionTitle">Ingressos</h2>
                {tickets.map((ticket, index) => (
                    <div key={index} className="ticketRow">
                        <select value={ticket.ticketTypeId}
                                onChange={(e) =>
                                    handleTicketChange(index, "ticketTypeId", e.target.value)
                                }>
                            <option value="">Selecione o tipo de ingresso</option>
                            {ticketType.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.ticketType}
                                </option>
                            ))}
                        </select>
                        <input type="number"
                               placeholder="Preço"
                               value={ticket.price}
                               onChange={(e) => handleTicketChange(index, "price", e.target.value)}/>
                        <input type="number"
                               placeholder="Quantidade"
                               value={ticket.quantity}
                               onChange={(e) => handleTicketChange(index, "quantity", e.target.value)}/>
                        <button className="deleteButton" onClick={ (e) => { handleRemoveTicket(index) }}><TiDelete/></button>
                
                    </div>
                    ))}
                <button  className="greenButton" onClick={handleAddTicket}><IoMdAdd />Adicionar Ingresso</button>
            </div>
        </div>
    </div>
  )
}

export default RegisterEvent
