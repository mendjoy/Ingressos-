import { useState } from "react"
import { Link } from "react-router-dom"

//components
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"

//context
import { useAuth } from "../../context/AuthContext"

//css
import  styles from "./Login.module.css"

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

            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })

            const data = await response.json()

            if(response.ok){

                login(data.username, data.token)
               
                setEmail("")
                setPassword("")

            }else{
                setErrorMessage(data.message)
            }
        } catch (error) {

            setErrorMessage(`Ocorreu um erro: ${error}`)
            
        }
    }
    
    return(
        <div className={styles.loginContainer}>
            <div>
                {successMessage && ( <SuccessMessage message={successMessage} 
                                                     onClose={() => setSuccessMessage('')} /> )}
                        
                {errorMessage && ( <ErrorMessage message={errorMessage} />) }
                <h1 className={styles.title}>Login</h1>
                <form className={styles.formLogin} onSubmit={handleSubmit}>
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
                    <div className={styles.registerDiv}>Não possui cadastro? <Link to="/register" className={styles.registerLink}>Cadastrar</Link></div>
                    <button type="submit" className={styles.loginButton}>Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login