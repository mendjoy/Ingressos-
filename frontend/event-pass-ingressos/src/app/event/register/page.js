"use client"

import { useState } from "react"

//components
import SuccessMessage from "../../../components/SuccessMessage/SuccessMessage"
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage"

import postData from "../../../service/api/postData"

//api
import getData from "@/service/api/getData"

const RegisterEvent = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [eventDate, setEventDate] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [capacity, setCapacity] = useState(null)
    const [location, setLocation] = useState("")
    const [urlImage, setUrlImage] = useState()
    const [ticketType, setTicketType] = useState()
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e) => {

        try {

            e.preventDefault()

            const eventRegister = {
                name,
                description,
                eventDate,
                startTime,
                endTime,
                capacity,
                location,
                urlImage
            }

            const data = await postData(`/event/register`, eventRegister)

            if(data.error){
                setErrorMessage(data.message)
            }else{
                setSuccessMessage(data.message)

                setTimeout(() => {
                    setSuccessMessage("")
                    setName("")
                    setDescription("")
                    setEventDate(null)
                    setStartTime(null)
                    setEndTime(null)
                    setCapacity(null)
                    setLocation("")
                    setUrlImage("")

                }, 2000)
            }

        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const getTickets = async () => {

        try {

          const result = await getData("/tickets")

          setTicketType(result.data)
          

        } catch (error) {

          setErrorMessage(error.message)
        }
      }

    useState(() => {

        getTickets()
    }, [])

    return (
        <div className="formContainer">
            <div>
                <form onSubmit={handleSubmit}>
                    {successMessage && ( <SuccessMessage message={successMessage}/> )}
                    {errorMessage && ( <ErrorMessage message={errorMessage} />) }
                    <h2 className="formTitle">Cadastrar Evento</h2>
                    <div className="labelInput">
                        <label>Nome do Evento</label>
                        <input type="text"  placeholder="Nome do Evento" 
                                            value={name}
                                            onChange={ (e) => {
                                                setName(e.target.value)
                                                setErrorMessage("")
                                             }} />
                    </div>
                    <div className="labelInput">  
                        <label>Descrição</label>
                        <textarea rows={2} cols={30}
                                  placeholder="Descrição do evento"
                                  value={description}
                                  onChange={ (e) => {
                                    setDescription(e.target.value)
                                    setErrorMessage("")
                         }}/>
                    </div> 
                    <div className="labelInput">  
                        <label>Data</label>   
                        <input type="date" 
                               placeholder="Data do evento"
                               value={eventDate}
                               onChange={(e) => {
                                    setEventDate(e.target.value)
                                    setErrorMessage('') 
                            }} />
                    </div>  
                    <div className="labelInput">
                        <label>Horário </label>
                        <div className="timeContainer">
                            <input type="time" value={startTime}
                                               onChange={ (e) => {
                                                    setStartTime(e.target.value)
                                                    setErrorMessage("")
                                                }}/> a 
                            <input type="time" value={endTime}  
                                               onChange={ (e) => {
                                                    setEndTime(e.target.value)
                                                    setErrorMessage("")
                                         }      }/>
                        </div>
                    </div>
                    <div className="labelInput">
                        <label>Capacidade máxima</label>
                        <input type="number"  placeholder="Capacidade Maxima" 
                                              value={capacity}
                                              onChange={ (e) => {
                                                setCapacity(e.target.value)
                                                setErrorMessage("")
                                             }} />     
                    </div>
                    <div className="labelInput">
                        <label>Local</label>
                        <input type="text"  placeholder="Local" 
                                            value={location}
                                            onChange={ (e) => {
                                                setLocation(e.target.value)
                                                setErrorMessage("")
                                         }} />
                    </div>
                    <div className="labelInput">
                        <label>Url imagem banner</label>
                        <input type="text"  placeholder="Url Banner" 
                                            value={urlImage}
                                            onChange={ (e) => {
                                                setUrlImage(e.target.value)
                                                setErrorMessage("")
                                         }} />                  
                    </div>
                    <button type="submit" className="blueButton">Cadastrar</button>
                </form>
            </div>
            <div className="ticketsSection">
                <h2>Ingressos</h2>
               
            </div>
        </div>
    )
}

export default RegisterEvent