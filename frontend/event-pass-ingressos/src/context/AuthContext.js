import React, { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [authority, setAuthority] = useState(null)

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

    useEffect(() => {
        const storedUser  = sessionStorage.getItem("username")
        const storedToken = sessionStorage.getItem("token")
        const storedAuthority = sessionStorage.getItem("authority")

        if(storedUser && storedToken && storedAuthority){
            setUser(storedUser)
            setToken(storedToken)
            setAuthority(storedAuthority)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, authority, login, logout }}>
            {children} 
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}