import { Link, useNavigate } from 'react-router-dom'

//css
import  styles from "./Login.module.css";

const Login = () => {
    return(
        <div className={styles.loginContainer}>
            <div>
                <h1 className={styles.title}>Login</h1>
                <form className={styles.formLogin}>
                    <input type="email"  placeholder="E-mail" />
                    <input type="password"  placeholder="Senha" />
                    <div className={styles.registerDiv}>Não possui cadastro? <Link to="/register" className={styles.registerLink}>Cadastrar</Link></div>
                    <button type="submit" className={styles.loginButton}>Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;