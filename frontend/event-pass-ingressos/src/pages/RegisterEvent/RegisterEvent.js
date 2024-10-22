import { useState } from "react"

//components
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"

const RegisterEvent = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [eventDate, setEventDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [capacity, setCapacity] = useState(0)
    const [location, setLocation] = useState("")
    const [bannerUrl, setBannerUrl] = useState()
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    return (
        <div className="formContainer">
            <div>
                <form>
                    {successMessage && ( <SuccessMessage message={successMessage}/> )}
                    {errorMessage && ( <ErrorMessage message={errorMessage} />) }
                    <h2 className="formTitle">Cadastrar Evento</h2>
                    <div className="labelInput">
                        <label>Nome do Evento</label>
                        <input type="text"  placeholder="Nome do Evento" 
                                            value={name}
                                            onChange={ (e) => {
                                                setName(e.target.value)
                                                setErrorMessage("")
                                             }} />
                    </div>
                    <div className="labelInput">  
                        <label>Descrição</label>
                        <textarea rows={5} cols={30}
                                  placeholder="Descrição do evento"
                                  value={description}
                                  onChange={ (e) => {
                                    setDescription(e.target.value)
                                    setErrorMessage("")
                         }}/>
                    </div> 
                    <div className="labelInput">  
                        <label>Data</label>   
                        <input type="date" 
                               placeholder="Data do evento"
                               value={eventDate}
                               onChange={(e) => {
                                    setEventDate(e.target.value)
                                    setErrorMessage('') 
                            }} />
                    </div>  
                    <div className="labelInput">
                        <label>Horário </label>
                        <div className="timeContainer">
                            <input type="time" value={startTime}
                                               onChange={ (e) => {
                                                    setStartTime(e.target.value)
                                                    setErrorMessage("")
                                                }}/> a 
                            <input type="time" value={endTime}  
                                               onChange={ (e) => {
                                                    setEndTime(e.target.value)
                                                    setErrorMessage("")
                                         }      }/>
                        </div>
                    </div>
                    <div className="labelInput">
                        <label>Capacidade máxima</label>
                        <input type="number"  placeholder="Capacidade Maxima" 
                                              value={capacity}
                                              onChange={ (e) => {
                                                setCapacity(e.target.value)
                                                setErrorMessage("")
                                             }} />     
                    </div>
                    <div className="labelInput">
                        <label>Local</label>
                        <input type="text"  placeholder="Local" 
                                            value={location}
                                            onChange={ (e) => {
                                                setLocation(e.target.value)
                                                setErrorMessage("")
                                         }} />
                    </div>
                    <div className="labelInput">
                        <label>Url imagem banner</label>
                        <input type="text"  placeholder="Url Banner" 
                                            value={bannerUrl}
                                            onChange={ (e) => {
                                                setBannerUrl(e.target.value)
                                                setErrorMessage("")
                                         }} />                  
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterEvent