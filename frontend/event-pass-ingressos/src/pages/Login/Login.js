import { useState } from "react"
import { Link } from "react-router-dom"

//components
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"

//context
import { useAuth } from "../../context/AuthContext"

import  postData  from "../../services/api/postData"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { login } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const userData = {
            email,
            password
        }

        try {

            const data = await postData("/user/login", userData)

            login(data.username, data.token)

            setEmail("")
            setPassword("")

        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    
    return(
        <div className="formContainer">
            <div> 
                <form onSubmit={handleSubmit}>
                    {successMessage && ( <SuccessMessage message={successMessage}/> )}
                    {errorMessage && ( <ErrorMessage message={errorMessage} />) }

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
                    <div className="registerLoginDiv">Não possui cadastro? <Link to="/register">Cadastrar</Link></div>
                    <button type="submit" className="blueButton">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login