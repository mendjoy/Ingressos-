import React, { createContext, useState, useContext } from "react"

const SearchContext = createContext()

export const SearchProvider = ( { children }) => {

    const [searchResults, setSearchResults] = useState([])

    return(
        <SearchContext.Provider value={{ searchResults, setSearchResults }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    return useContext(SearchContext)
}