import React, { createContext, useState, useContext } from "react"

const SearchContext = createContext()

export const SearchProvider = ( { children }) => {

    const [searchResults, setSearchResults] = useState([])
    const [currentPageResult, setCurrentPageResult] = useState(0)
    const [totalPagesResult,  setTotalPagesResult] = useState(0)

    return(
        <SearchContext.Provider value={{ searchResults, setSearchResults, currentPageResult, setCurrentPageResult, totalPagesResult, setTotalPagesResult }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    return useContext(SearchContext)
}