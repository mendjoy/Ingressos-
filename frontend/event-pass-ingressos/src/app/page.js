"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation' 

import getData from "@/service/api/getData"
import EventCard from "@/components/EventCard/EventCard"

//components
import ErrorMessage   from "@/components/ErrorMessage/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage/SuccessMessage"

const Home = () =>{

    const [events, setEvents] = useState([])
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const router = useRouter()

    const getEvents = async () => {

        try {

            const response = await getData("/event")

            if(response.error){
                    
                setErrorMessage(response.message)

            }else{

                setEvents(response.data.content)

            }
        } catch (error) {

            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        
        getEvents()

    }, [])
  
    return (
    <div>
        {errorMessage   && ( <ErrorMessage message={errorMessage} />) }
        {successMessage && ( <SuccessMessage message={successMessage}/> )}
        <div className="cardContainer">
            {events.map((event) => (
            <EventCard
                key={event.id}
                name={event.name}
                date={event.eventDate}
                location={event.location}
                urlImage={event.urlImage}
                onClick={() => { router.push(`/event/${event.id}`)}}/>
          ))}
        </div>
    </div>
  )
}

export default Home