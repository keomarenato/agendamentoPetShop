
import { IPets } from '../../../../../interfaces/Pet'
import styles from './petLIst.module.css'

export const PetList = ({ nome, tipo, raca, peso, cor, dataNascimento, imagemUrl, usuario }: IPets) => {
  return (
    <div className={styles.petCart}>

      <img src={`http://localhost:3333${imagemUrl}`} alt={nome} className={styles.petImage} />

      <div className={styles.petInfo}>
        <p>Nome: {nome}</p>
        <p>Nascimento: {dataNascimento}</p>
        <p>Raça: {raca}</p>
        <p>Peso: {peso} kilos</p>
        <p>Cor: {cor}</p>
        <p>Cliente: {usuario}</p>
      </div>

    </div>
  )
}
