"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation' 

//components
import ErrorMessage   from "../../../components/ErrorMessage/ErrorMessage"
import SuccessMessage from "../../../components/SuccessMessage/SuccessMessage"

//context
import { useAuth } from "../../../context/AuthContext"

import  postData  from "../../../service/api/postData"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { user, login, isLoading } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        try {
            const data = await postData("/user/login", userData)

            if(data.error){
                
                setErrorMessage(data.message)

            }else{
                login(data.data.username, data.data.token, data.data.admin)
                router.push("/")
                setEmail("")
                setPassword("")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {

        if(user !== null){
            router.push("/")
        }
        
    }, [isLoading])

    return (
        <>{isLoading == false && user == null ? (
            <div className="formContainer">
                <div>
                    <form onSubmit={handleSubmit}>
                        {errorMessage   && ( <ErrorMessage message={errorMessage} />) }
                        {successMessage && ( <SuccessMessage message={successMessage}/> )}
                        <h2 className="formTitle">Login</h2>
                        <input type="email"  placeholder="E-mail" 
                                             value={email}
                                             onChange={ (e) => {
                                                setEmail(e.target.value)
                                                setErrorMessage("")
                                             }} />
                        <input type="password"  placeholder="Senha"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                    setErrorMessage("")
                                                }} />
                        <div className="registerLoginDiv">Não possui cadastro? <Link href="/user/register">Cadastrar</Link></div>
                        <button type="submit" className="blueButton">Entrar</button>
                    </form>
                </div>
            </div>
        ) : <></>}
    </>   
    )
}

export default Login