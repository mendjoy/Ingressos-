import styles from "./UserProfile.module.css"

const UserProfile = () => {

    return (
        <div className={styles.profileContainer}>
            <h2 className={styles.title}>Dados da Conta</h2>
            <div className={styles.profileDetail}>
                <label htmlFor="name">Nome</label>
                <input 
                    type="text" 
                    id="name" 
                    className={styles.inputField} />
            </div>
            <div className={styles.profileDetail}>
                <label htmlFor="name">Nome de Usuario</label>
                <input 
                    type="text" 
                    id="name" 
                    className={styles.inputField} 
                    readOnly/>
            </div>
            <div className={styles.profileDetail}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    className={styles.inputField} 
                    readOnly/>
            </div>
            <div className={styles.profileDetail}>
                <label htmlFor="phone">Telefone</label>
                <input 
                    type="tel" 
                    id="phone" 
                    className={styles.inputField} />
            </div>
            <div className={styles.profileDetail}>
                <label htmlFor="registrationDate">Data de Cadastro</label>
                <input 
                    type="date" 
                    id="registrationDate"
                    className={styles.inputField} 
                    readOnly/>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.saveButton}>Salvar Dados</button>
                <button className={styles.deleteButton}>Excluir Conta</button>
            </div>
        </div>
    )
}

export default UserProfile
