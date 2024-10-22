import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [authority, setAuthority] = useState(null)

    const navigate = useNavigate()

    const login = (username, authToken, authority) => {
        setUser(username) 
        setToken(authToken)
        setAuthority(authority)
        localStorage.setItem("username", username)
        localStorage.setItem("token", authToken)
        localStorage.setItem("authority", authority)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setAuthority(null)
        localStorage.clear()
        navigate("/")
    }

    useEffect(() => {
        const storedUser  = localStorage.getItem("username")
        const storedToken = localStorage.getItem("token")
        const storedAuthority = localStorage.getItem("authority")

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