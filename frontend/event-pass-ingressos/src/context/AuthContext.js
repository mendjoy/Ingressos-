import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(localStorage.getItem("username"))
    const [token, setToken] = useState(localStorage.getItem("token"))

    const navigate = useNavigate()

    const login = (username, authToken) => {
        setUser(username) 
        setToken(authToken)
        localStorage.setItem("username", username)
        localStorage.setItem("token", authToken)
        navigate("/")
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("username")
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children} 
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}