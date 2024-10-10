import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

//components
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

const Register = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    

    const handleSubmit = async (event) => {
        event.preventDefault()

        const userData = {
            name,
            username,
            email,
            birthDate,
            phone,
            password,
            confirmPassword,
        }
    
        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            const message = await response.text()

            if (response.ok) {
                setSuccessMessage(message)

                setName('')
                setUsername('')
                setEmail('')
                setBirthDate('')
                setPhone('')
                setPassword('')
                setConfirmPassword('')

                navigate(`/profile/${username}`); 

            }else{
                setErrorMessage(message)
            }
    
        } catch (error) {
            setErrorMessage(`Ocorreu um erro: ${error}`)
        }
    }

    return (
        <div className="formContainer">
            <div>
                {successMessage && ( <SuccessMessage message={successMessage}/> )}   
                {errorMessage && ( <ErrorMessage message={errorMessage} />) }

                
                <form onSubmit={handleSubmit}>
                    <h2 className="formTitle">Cadastro</h2>
                    <input type="text" 
                           placeholder="Nome"
                           value={name} 
                           onChange={(e) => { 
                                setName(e.target.value)  
                                setErrorMessage('') 
                            }}  />

                    <input type="text" 
                           placeholder="Nome de Usuario"
                           value={username} 
                           onChange={(e) => {
                                setUsername(e.target.value)
                                setErrorMessage('') 
                            }} />

                    <input type="email" 
                           placeholder="E-mail"
                           value={email} 
                           onChange={(e) => {
                                setEmail(e.target.value)
                                setErrorMessage('') }} />

                    <input type="date" 
                           placeholder="Data de Nascimento"
                           value={birthDate}
                           onChange={(e) => {
                                setBirthDate(e.target.value)
                                setErrorMessage('') 
                            }} />

                    <input type="tel" 
                           placeholder="Telefone"
                           value={phone}
                           onChange={(e) => { 
                                setPhone(e.target.value)
                                setErrorMessage('') 
                            }} />

                    <input type="password" 
                           placeholder="Senha"
                           value={password}
                           onChange={(e) => { 
                                setPassword(e.target.value)
                                setErrorMessage('') 
                            }} />

                    <input type="password" 
                           placeholder="Confirmar Senha"
                           value={confirmPassword}
                           onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setErrorMessage('') 
                            }} />

                    <div className="registerLoginDiv">
                        Já possui conta? <Link to="/login">Entrar</Link>
                    </div>
                    <button type="submit" className="blueButton">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
