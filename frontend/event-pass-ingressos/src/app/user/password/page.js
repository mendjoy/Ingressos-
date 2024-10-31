"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation' 

import patchData from "../../../service/api/patchData"

//components
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage"
import SuccessMessage from "../../../components/SuccessMessage/SuccessMessage"

const ChangePassword = () => {
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const passwordUpdate = {
            password,
            newPassword,
            confirmNewPassword
        }

        try {
           
            const data = await patchData("/user/profile/change", passwordUpdate)

            if(data.error){
                
                setErrorMessage(data.message)

            }else{
                
                setErrorMessage("")
                setSuccessMessage(data.message)
                
                setTimeout(() => {
                    setSuccessMessage("")
                    setPassword("")
                    setNewPassword("")
                    setConfirmNewPassword("")
                    router.push("/")
                }, 2000)
            }
           
        } catch (error) {

            setErrorMessage(error.message)
        }
    }
    
    return (
        <div className="formContainer">
            <div>
                <form onSubmit={handleSubmit}>

                    {errorMessage && ( <ErrorMessage message={errorMessage} />) }
                    {successMessage && ( <SuccessMessage message={successMessage}/> )}

                    <h2 className="formTitle">Alterar Senha</h2>
                    <input type="password"  placeholder="Senha Atual"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>

                    <input type="password"  placeholder="Nova Senha"
                           value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}/>
                    <input type="password"  placeholder="Confirmação Nova Senha"
                           value={confirmNewPassword}
                           onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                    <button type="submit" className="blueButton">Salvar</button>
                </form>
            </div>
            
        </div>
    )
}

export default ChangePassword