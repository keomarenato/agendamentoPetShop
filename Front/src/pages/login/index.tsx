import styles from './login.module.css'
import logoDireita from '../../assets/de1.jpg'
import logoEsquerda from '../../assets/des2.jpg'
import facebookLogo from '../../assets/facebook.jpg'
import googleLogo from '../../assets/google.jpg'
import { useState } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'



export const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await api.post('/login', {
        email,
        senha
      })

      const { token, usuario } = response.data

      localStorage.setItem('name', usuario.nome)

      if (usuario.tipo === 'FUNCIONARIO') {
        navigate('/homeEmployee')
      }

      console.log('Dados', response.data)
    } catch (error) {

    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={logoEsquerda} className={styles.logoLeft} alt="Logo Esquerda" />
        <img src={logoDireita} className={styles.logoRight} alt="Logo Direita" />
      </div>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>Pet <span>Zen</span></h1>
        <p className={styles.subTitle}>Faça login para acessar a sua conta</p>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Email</label>
          <input
            className={styles.inputField}
            type='email'
            placeholder='Insira o seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Senha</label>
          <input
            className={styles.inputField}
            type='password'
            placeholder="Insira a sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className={styles.forgotPassword}>
          <a href="#">Esqueceu a senha?</a>
        </div>

        <button type="submit" className={styles.loginButton}>Acessar</button>

        <div className={styles.divider}>
          <span>Ou acesse com</span>
        </div>

        <div className={styles.socialLogin}>
          <img src={facebookLogo} className={styles.socialIcon} alt="Facebook Logo" />
          <img src={googleLogo} className={styles.socialIcon} alt="Google Logo" />
        </div>

        <div className={styles.register}>
          Não possui uma conta? <a href='#'>Cadastre-se</a>
        </div>
      </form>
    </div>
  )
}
