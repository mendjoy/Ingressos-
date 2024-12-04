"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation' 

import getData from "@/service/api/getData"
import EventCard from "@/components/EventCard/EventCard"

//components
import ErrorMessage   from "@/components/ErrorMessage/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage/SuccessMessage"
import Pagination from "@/components/Pagination/Pagination"
import { useSearch } from "@/context/SearchContext"

const Home = () =>{

    const [events, setEvents] = useState([])
    const { searchResults, currentPageResult, setCurrentPageResult, totalPagesResult } = useSearch();
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    const router = useRouter()

    const getEvents = async (page) => {
        
        try {

            const response = await getData(`/event?page=${page}`)

            if(response.error){
                    
                setErrorMessage(response.message)

            }else{

                setEvents(response.data.content)

                if(page == 0){

                    setTotalPages(response.data.totalPages)
                }

            }
        } catch (error) {

            setErrorMessage(error.message)
        }
    }

    const handlePageChange = (page) => {

        if (searchResults.length > 0) {
            if (page >= 0 && page < totalPagesResult) {
                setCurrentPageResult(page)
            }
        } else {
            if (page >= 0 && page < totalPages) {
                setCurrentPage(page)
            }
        }
    }

    useEffect(() => {

        if (searchResults.length == 0) {
            getEvents(currentPage)
        } 

    }, [currentPage, searchResults])
  
    return (
    <div>
        {errorMessage   && ( <ErrorMessage message={errorMessage} />) }
        {successMessage && ( <SuccessMessage message={successMessage}/> )}
        <div className="cardContainer">
            {(searchResults && searchResults.length > 0 ? searchResults : events).map((event) => (
                <EventCard
                    key={event.id}
                    name={event.name}
                    date={event.eventDate}
                    location={event.location}
                    urlImage={event.urlImage}
                    onClick={() => { router.push(`/event/${event.id}`) }}
                />
            ))}
        </div>
        <Pagination currentPage={searchResults.length > 0 ? currentPageResult : currentPage}
                    totalPages={searchResults.length > 0 ? totalPagesResult : totalPages}
                    onPageChange={handlePageChange}/>
    </div>
  )
}

export default Home