import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import styles from './agendar.module.css'
import { IServico } from '../../../../interfaces/Servico'
import { IPets } from '../../../../interfaces/Pet'



export const Agendar = () => {

  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [telefone, setTelefone] = useState('')

  const [servicos, setServicos] = useState<IServico[]>([])
  const [modalAgendamentoOpen, setModalAgendamentoOpen] = useState(false)

  const [tutor, setTutor] = useState('')
  const [pets, setPets] = useState<IPets[]>([])
  const [selectedPet, setSelectedPet] = useState('')
  const [selectedServico, setSelectedServico] = useState<number | null>(null)
  const [usuarioId, setUsuarioId] = useState<number | null>(null)
 

  const openServiceModel = (id: number) => {
    setSelectedServico(id)
    setModalAgendamentoOpen(true)
   
    console.log('ID do serviço selecionado:', id);
  }


  const getServicosAll = async () => {
    try {
      const response = await api.get('/servicos')
      setServicos(response.data)

      console.log("Servicos", response.data)
    } catch (error) {
      console.log(error)
    }
  }


  // Função para buscar os pets quando o nome do tutor é digitado
  const fetchPets = async (nomeTutor: string) => {
    try {
      const response = await api.get(`/usuarios/pets?nome=${nomeTutor}`)

      if(response.data.length > 0) {
        const primeiroPet = response.data[0]
        setUsuarioId(primeiroPet.usuarioId  || null)
        setPets(response.data)

      }else {
        console.log('Tutor não encontrado. Cadastre o tutor e o pet.');
        setPets([]);
        setUsuarioId(null);
      }

    } catch (error) {
      console.log('Erro ao buscar pets:', error);
    }
  }

  // Função chamada ao alterar o nome do tutor
  const handleTutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nome = e.target.value
    setTutor(nome)

    if (nome.length > 2) {
      fetchPets(nome)
    }
  }


// Função para lidar com o envio do formulário e criar o agendamento
 const handleAgendamento = async(e: React.FormEvent) => {
  e.preventDefault();

  if(!usuarioId ||!selectedPet || !selectedServico) {
    alert('Por favor, verifique os dados do tutor, pet e serviço.');
    return;
  }

  try {

    const datetimeString = `${data}T${horario}:00`;
    const datetime = new Date(datetimeString)  

    if(isNaN(datetime.getTime())) {
      alert('Por favor, insira uma data e horário válidos.');
      return;
    }

  const agendamentoData = {
    data: datetime,
    horario,
    observacoes,
    petId: parseInt(selectedPet),
    servicoId: selectedServico,
    usuarioId,
    tipoAgendamento: 'SERVICO',
    telefone
    
  }

    const responseAgendamento = await api.post('/agendamentos', agendamentoData)
    console.log('Agendamento criado:', responseAgendamento.data);
    setModalAgendamentoOpen(false)
  } catch (error) {
   console.log(error)
   
  }
 }

 
 useEffect(() => {
  getServicosAll()
}, [])


  return (
    <div className={styles.content}>
      <p className={styles.paragrapha}>Nossos Serviços</p>

      <div className={styles.container}>
        {servicos.map((servico) => (
          <div className={styles.servicoCard} key={servico.id}>
            <img src={`http://localhost:3333${servico.imagemServico}`} className={styles.servicoImage} alt={`Imagem do serviço ${servico.nome}`} />
            <div key={servico.id} className={styles.servicoInfo}>
              <p>{servico.nome}</p>
              <p>{servico.duracao} minutos</p>
              <p>{servico.descricao} minutos</p>
              <p>R$ {servico.preco},00</p>
            </div>
            <button onClick={() => openServiceModel(servico.id)} className={styles.servicoButton}>Agendar</button>
          </div>
        ))}
      </div>


      <div>
        {modalAgendamentoOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button onClick={() => setModalAgendamentoOpen(false)}>Fechar</button>
              <h3 className={styles.modalHeader}>Agende um atendimento</h3>
              <p style={{ textAlign: 'center', marginBottom: '15px', color: '#AAA' }}>
                Preencha os dados do cliente para realizar o agendamento:
              </p>
              <form className={styles.modalForm} onSubmit={handleAgendamento}>
                <label>Nome do tutor</label>
                <input
                  type="text"
                  id="tutor"
                  placeholder="Preencha o nome"
                  value={tutor}
                  onChange={handleTutorChange}
                />

                <label>Nome do pet</label>
                <select value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)}>
                  <option value=''>Selecione o Pet</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.nome}
                    </option>
                  ))}
                </select>

                <label htmlFor="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />

                <label htmlFor="observacoes">Descrição do serviço</label>
                <textarea
                  id="observacoes"
                  placeholder="Preencha observações"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                />

                <div className={styles.dateTimeContainer}>
                  <div className={styles.dateInput}>
                    <label htmlFor="data">Data</label>
                    <input
                      type="date"
                      id="data"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                    />
                  </div>

                  <div className={styles.timeInput}>
                    <label htmlFor="horario">Hora</label>
                    <input
                      type="time"
                      id="horario"
                      value={horario}
                      onChange={(e) => setHorario(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit">Agendar</button>
              </form>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
