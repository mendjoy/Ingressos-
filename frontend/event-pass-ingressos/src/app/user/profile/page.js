"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation' 

//components
import ErrorMessage   from "../../../components/ErrorMessage/ErrorMessage"
import SuccessMessage from "../../../components/SuccessMessage/SuccessMessage"

//context
import { useAuth } from "../../../context/AuthContext"

import getData     from "../../../service/api/getData"
import patchData   from "../../../service/api/patchData"
import deleteData  from "../../../service/api/deleteData"

const Profile = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [phone, setPhone] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const router = useRouter()
    const { user, logout, isLoading } = useAuth()

    const getUserDetails = async () => {

        try {

            const data = await getData("/user/profile")

            let newDateObj = new Date(data.data.birthDate)
            const formattedDate = newDateObj.toISOString().split("T")[0]

            setName(data.data.name)
            setUsername(data.data.username)
            setEmail(data.data.email)
            setBirthDate(formattedDate)
            setPhone(data.data.phone)

        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const handleSubmit = async (event) => {

        try {

            event.preventDefault()

            const userUpdate = {
                name,
                username,
                birthDate,
                email,
                phone,
            }

            const data = await patchData(`/user/profile`, userUpdate)

            if(data.error){
                
                setErrorMessage(data.message)
            }else{

                setSuccessMessage(data.message)

                setTimeout(() => {
                    setSuccessMessage("")
                    setName("")
                    setUsername("")
                    setEmail("")
                    setBirthDate("")
                    setPhone("")
                    router.push("/")
                }, 2000)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const deleteAccount = async (event) => {

        try {

            event.preventDefault()
            const data = await deleteData("/user")

            setSuccessMessage(data.message)

            setTimeout(() => {
                setSuccessMessage("")
                setName("")
                setUsername("")
                setEmail("")
                setBirthDate("")
                setPhone("")
                logout()
                router.push("/")
              }, 2000)
          
        } catch (error) {
             setErrorMessage(error.message)
        }
    }

    useEffect(() => {

        if(user !== null){
            getUserDetails()
        }else{
            router.push("/")
        }
        
    }, [isLoading])

    useEffect(() => {

    })

    return (
        <> {isLoading == false && user !== null ? (
            <div className="formContainer">            
                <form>

                    {errorMessage && ( <ErrorMessage message={errorMessage} />) }
                    {successMessage && ( <SuccessMessage message={successMessage}/> )}

                    <h2 className="formTitle">Dados da Conta</h2>
                    <div className="labelInput">
                        <label htmlFor="name">Nome</label>
                        <input type="text" 
                               id="name" 
                               value={name}
                               onChange={(e) => { setName(e.target.value) }}/>
                    </div>
                    <div className="labelInput">
                        <label htmlFor="name">Nome de Usuario</label>
                        <input type="text" 
                               id="name" 
                               readOnly
                               value={username}/>
                    </div>
                    <div className="labelInput">
                        <label htmlFor="birthDate">Data de Nascimento</label>
                        <input type="date" 
                               id="birthDate"
                               readOnly
                               value={birthDate}/>
                    </div>
                    <div className="labelInput">
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                               id="email" 
                               readOnly
                               value={email}/>
                    </div>
                    <div className="labelInput">
                        <label htmlFor="phone">Telefone</label>
                        <input type="tel" 
                               id="phone"  
                               value={phone}
                               onChange={(e) => { setPhone(e.target.value) }}/>
                    </div>
                    <div className="btContainer">
                        <button className="blueButton" onClick={handleSubmit}>Salvar Dados</button>
                        <button className="redButton"  onClick={deleteAccount}>Excluir Conta</button>
                    </div>
                </form>
            </div>
            ) : <></>}
        </>
    )
}

export default Profile
