import { Link } from 'react-router-dom';
import styles from './homeFuncionario.module.css'


export default function HomeFuncionario() {

  const name = localStorage.getItem('name')

  return (
    <div className={styles.sidebar}>
      <p>Bem-vindo: {name}</p>
      <ul>
        <li><Link to="homeEmploye">Home</Link></li>
        <li><Link to="pet">Cadastrar Pet</Link></li>
        <li><Link to="agendar">Agendar</Link></li>
        <li><Link to="agendar-veterinaria">Agendar Veterinária</Link></li>
        <li><Link to="hospedagem">Hospedagem</Link></li>
        <li><Link to="clientes">Clientes</Link></li>
        <li><Link to="historicos">Históricos</Link></li>
      </ul>
    </div>
  )
}
