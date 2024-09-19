import { Link } from 'react-router-dom'

//css
import styles from "../Login/Login.module.css";

const Register = () => {
    return (
        <div className={styles.registerContainer}>
            <div>
                <h1 className={styles.title}>Cadastro</h1>
                <form className={styles.formRegister}>
                    <input type="text" placeholder="Nome" />
                    <input type="email" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                    <input type="password" placeholder="Confirmar Senha" />
                    <div className={styles.loginDiv}>
                        Já possui conta? <Link to="/login" className={styles.loginLink}>Entrar</Link>
                    </div>
                    <button type="submit" className={styles.registerButton}>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
