import { useEffect, useState } from "react"
import styles from "./UserProfile.module.css"

//components
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

const UserProfile = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [phone, setPhone] = useState("")
    const [errorMessage, setErrorMessage] = useState('')

    const getUserDetails = async () => {

        const token = localStorage.getItem('token');
       
        try {
            const response = await fetch(`/user/profile`, {
                method: "GET",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

            const data = await response.json()

            let newDateObj = new Date(data.birthDate)
            const formattedDate = newDateObj.toISOString().split("T")[0]

            setName(data.name)
            setUsername(data.username)
            setEmail(data.email)
            setBirthDate(formattedDate)
            setPhone(data.phone)

        } catch (error) {
            setErrorMessage(`Ocorreu um erro: ${error}`)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className={styles.profileContainer}>            
            {errorMessage && ( <ErrorMessage message={errorMessage} />) }
            <h2 className={styles.title}>Dados da Conta</h2>
            <div className={styles.profileDetail}>
                <label htmlFor="name">Nome</label>
                <input 
                    type="text" 
                    id="name" 
                    className={styles.inputField} 
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}/>
            </div>
            <div className={styles.profileDetail}>
                <label htmlFor="name">Nome de Usuario</label>
                <input 
                    type="text" 
                    id="name" 
                    className={styles.inputField} 
                    readOnly
                    defaultValue={username}/>
            </div>
            <div className={styles.profileDetail}>
                <label htmlFor="birthDate">Data de Nascimento</label>
                <input 
                    type="date" 
                    id="birthDate"
                    className={styles.inputField} 
                    readOnly
                    defaultValue={birthDate}/>
            </div>
            <div className={styles.profileDetail}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    className={styles.inputField} 
                    readOnly
                    defaultValue={email}/>
            </div>
            <div className={styles.profileDetail}>
                <label htmlFor="phone">Telefone</label>
                <input 
                    type="tel" 
                    id="phone" 
                    className={styles.inputField} 
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}/>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.saveButton}>Salvar Dados</button>
                <button className={styles.deleteButton}>Excluir Conta</button>
            </div>
        </div>
    )
}

export default UserProfile
