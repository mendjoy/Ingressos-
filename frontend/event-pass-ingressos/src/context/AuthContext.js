import React, { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [authority, setAuthority] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const login = (username, authToken, authority) => {
        setUser(username) 
        setToken(authToken)
        setAuthority(authority)
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("token", authToken)
        sessionStorage.setItem("authority", authority)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setAuthority(null)
        sessionStorage.clear()
    }

    const convertBoolean = (string) => {
        return string == "true" ? true : false 
    }

    useEffect(() => {
        const storedUser  = sessionStorage.getItem("username")
        const storedToken = sessionStorage.getItem("token")
        const storedAuthority = sessionStorage.getItem("authority")

        if(storedUser && storedToken && storedAuthority){
            setUser(storedUser)
            setToken(storedToken)
            setAuthority(convertBoolean(storedAuthority))
        }

        setIsLoading(false)

    }, [])

    return (
        <AuthContext.Provider value={{ user, token, authority, login, logout, isLoading }}>
            {children} 
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}