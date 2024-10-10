
const ChangePassword = () => {
    return (
        <div className="formContainer">
            <div>
                <form>
                    <h2 className="formTitle">Alterar Senha</h2>
                    <input type="password"  placeholder="Senha Atual"/>

                    <input type="password"  placeholder="Nova Senha"/>
                    <button type="submit" className="blueButton">Salvar</button>
                </form>
            </div>
            
        </div>
    )
}

export default ChangePassword;