import { useEffect, useState } from 'react'
import styles from './pet.module.css'
import { api } from '../../../../services/api';
import { Form } from 'react-router-dom';
import { PetList } from './petList';
import { IPets } from '../../../../interfaces/Pet';
import { IUsers } from '../../../../interfaces/Users';

export const Pet = () => {

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [raca, setRaca] = useState('');
  const [peso, setPeso] = useState('');
  const [cor, setCor] = useState('');
  const [usuarioId, setUsuarioId] = useState('');


  const [modal, setModal] = useState(false)
  const [listUsers, setListUsers] = useState<IUsers[]>([])
  const [pets, setPets] = useState<IPets[]>([])


  const getOpenModel = async () => {
    setModal(true)
  }

  const closeModal = async () => {
    setModal(false)
  }

  const getUsers = async () => {
    try {
      const response = await api.get('/usuariosTipo')
      setListUsers(response.data)
      console.log('Usuarios', response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('tipo', tipo)
    formData.append('raca', raca)
    formData.append('peso', peso)
    formData.append('cor', cor)
    formData.append('usuarioId', usuarioId)

    const fileInput = (e.target as HTMLFormElement).querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append('imagemUrl', fileInput.files[0])
    }

    try {
      const response = await api.post('/pets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log('Pet criado com sucesso', response.data)
      closeModal()

    } catch (error) {
      console.error('Erro ao criar o pet', error);
    }
  }

  const getPets = async () => {
    try {
      const response = await api.get('/pets')
      setPets(response.data)
      console.log('Pets', response.data)
    } catch (error) {
      console.error('Erro ao criar o pet', error);
    }
  }

  useEffect(() => {
    getUsers()
    getPets()
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.searchContainer}>
        <button className={styles.buttonModal} onClick={getOpenModel}>
          Cadastrar Pet
        </button>

        <div className={styles.search}>
           <select className={styles.searchSelect}>
            <option value='cliente'>Cliente</option>
            <option value='animal'>Pet</option>
           </select>

          <input type="text" placeholder='Buscar' />
          <button className={styles.buttonModal}>Pesquisar</button>
        </div>
      </div>

      {modal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.paraphPet}>Cadastrar Pet</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Nome:</label>
                  <input
                    type='text'
                    placeholder="Insira o nome do pet"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Tipo:</label>
                  <input
                    type="text"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    placeholder="Insira o tipo do pet"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Raça:</label>
                  <input
                    type="text"
                    value={raca}
                    onChange={(e) => setRaca(e.target.value)}
                    placeholder="Insira a raça do pet"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Peso:</label>
                  <input
                    type="text"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Insira o peso do pet"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Cor:</label>
                  <input
                    type="text"
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    placeholder="Insira a cor do pet"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Usuários</label>
                  <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)}>
                    <option value="">Selecione um usuário</option>
                    {listUsers.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Imagem:</label>
                  <input
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className={styles.buttonAction}>Cadastrar</button>
                <button type="button" className={styles.buttonClose} onClick={closeModal}>Fechar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.petListContainer}>
        {pets.map((pet) => (
          <PetList
            id={pet.id}
            nome={pet.nome}
            dataNascimento={pet.dataNascimento}
            raca={pet.raca}
            peso={pet.peso}
            cor={pet.cor}
            imagemUrl={pet.imagemUrl}
            usuario={pet.usuario.nome}
          />
        ))}
      </div>

    </div>
  )
}
