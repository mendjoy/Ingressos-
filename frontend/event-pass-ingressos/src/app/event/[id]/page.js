"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import getData from "@/service/api/getData"
import styles from './page.module.css'

// components
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage"
import SuccessMessage from "../../../components/SuccessMessage/SuccessMessage"

const EventDetails = () => {

    const [event, setEvent] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const param = useParams()
    const router = useRouter()
    
    const findById = async () => {

        try {

            const data = await getData(`/event/${param.id}`)

            if (data.error) {

                setErrorMessage(data.message)

            } else {

                setEvent(data.data)

            }
        } catch (error) {

        setErrorMessage(error.message)

        }
    }

    useEffect(() => {

        findById()

    }, [param])

    return (
        <div className={styles.container}>
            {errorMessage   && ( <ErrorMessage message={errorMessage} />) }
            {successMessage && ( <SuccessMessage message={successMessage}/> )}
            {event && (
                <div>
                    <h1 className={styles.eventTitle}>{event.name}</h1>
                    {event.urlImage ? ( <img src={event.urlImage} alt={event.name} className={styles.eventImage} />) : 
                                        <img src="/images/notfound.jpg" alt={event.name} className={styles.eventImage} />}
                    <div className={styles.eventDetail}>
                        <p><span>Descrição:</span> {event.description}</p>
                        <p><span>Data:</span> {new Date(event.eventDate).toLocaleDateString()}</p>
                        <p><span>Horário:</span> {event.startTime} - {event.endTime}</p>
                        <p><span>Local:</span> {event.location}</p>
                        <button className="blueButton" onClick={() => { router.push(`/event/ticket/${event.id}`)}}>Obter Ingressos</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventDetails
