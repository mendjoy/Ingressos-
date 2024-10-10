import { useEffect, useState } from "react"

//components
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage"

const UserProfile = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [phone, setPhone] = useState("")
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const token = localStorage.getItem("token")

    const getUserDetails = async () => {

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

            if(response.ok){
                setName(data.name)
                setUsername(data.username)
                setEmail(data.email)
                setBirthDate(formattedDate)
                setPhone(data.phone)
            }else{
                setErrorMessage(data.message)
            }
         

        } catch (error) {
            setErrorMessage(`Ocorreu um erro: ${error}`)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const userUpdate = {
            name,
            username,
            birthDate,
            email,
            phone,
        }

        try {

            const response = await fetch(`/user/profile`, {
                method: "PATCH",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userUpdate)

            })

            const data = await response
            console.log(data)

            if(response.ok){
               // setSuccessMessage(response.text())
            }else{
                //setErrorMessage(response.text())
            }

            
        } catch (error) {
            setErrorMessage(`Ocorreu um erro: ${error}`)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className="formContainer">            
            {errorMessage && ( <ErrorMessage message={errorMessage} />) }
            {successMessage && ( <SuccessMessage message={successMessage}/> )}
            <form onSubmit={handleSubmit}>
                <h2 className="formTitle">Dados da Conta</h2>
                <div className="labelInput">
                    <label htmlFor="name">Nome</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}/>
                </div>
                <div className="labelInput">
                    <label htmlFor="name">Nome de Usuario</label>
                    <input 
                        type="text" 
                        id="name" 
                        readOnly
                        defaultValue={username}/>
                </div>
                <div className="labelInput">
                    <label htmlFor="birthDate">Data de Nascimento</label>
                    <input 
                        type="date" 
                        id="birthDate"
                        readOnly
                        defaultValue={birthDate}/>
                </div>
                <div className="labelInput">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        readOnly
                        defaultValue={email}/>
                </div>
                <div className="labelInput">
                    <label htmlFor="phone">Telefone</label>
                    <input 
                        type="tel" 
                        id="phone"  
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value) }}/>
                </div>
                <div className="btContainer">
                    <button className="blueButton">Salvar Dados</button>
                    <button className="redButton">Excluir Conta</button>
                </div>
            </form>
        </div>
    )
}

export default UserProfile
