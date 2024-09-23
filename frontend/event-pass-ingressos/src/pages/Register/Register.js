import { Link } from 'react-router-dom'
import { useState } from 'react';

//css
import styles from "../Login/Login.module.css";

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        const userData = {
            name,
            email,
            birthDate,
            phone,
            password,
            confirmPassword,
        }
    

        console.log(userData)
        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }

            setName('')
            setEmail('')
            setBirthDate('')
            setPhone('')
            setPassword('')
            setConfirmPassword('')

            const data = await response.json();
            console.log('Usuário cadastrado com sucesso:', data);
            // Redirecionar ou exibir uma mensagem de sucesso

        } catch (error) {
            console.error('Erro:', error);
        }
    }

    return (
        <div className={styles.registerContainer}>
            <div>
                <h1 className={styles.title}>Cadastro</h1>
                <form className={styles.formRegister} onSubmit={handleSubmit}>
                    <input type="text" 
                           placeholder="Nome"
                           value={name} 
                           onChange={(e) => setName(e.target.value)}  />

                    <input type="email" 
                           placeholder="E-mail"
                           value={email} 
                           onChange={(e) => setEmail(e.target.value)} />

                    <input type="date" 
                           placeholder="Data de Nascimento"
                           value={birthDate}
                           onChange={(e) => setBirthDate(e.target.value)} />

                    <input type="tel" 
                           placeholder="Telefone"
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)} />

                    <input type="password" 
                           placeholder="Senha"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)} />

                    <input type="password" 
                           placeholder="Confirmar Senha"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)} />

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
