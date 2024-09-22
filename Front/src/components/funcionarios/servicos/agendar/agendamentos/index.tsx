import { useEffect, useState } from 'react'
import styles from './agendamentos.module.css'
import { api } from '../../../../../services/api'
import { IAgendamento } from '../../../../../interfaces/Agendamento'

export const Agendamentos = () => {
    const [listAgendamentos, setlistAgendamentos] = useState<IAgendamento[]>([])

    const getListAgendamentos = async () => {
        try {
            const response = await api.get('/agendamentos')
            setlistAgendamentos(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const buscarAgendamentosPorData = async (data: string) => {
     try {
       const response = await api.get(`agendamentosData/data?data=${data}`) 
       setlistAgendamentos(response.data)
     } catch (error) {
        console.error("Erro ao buscar agendamentos por data:", error);
     }
    }

    useEffect(() => {
        getListAgendamentos()
    }, [])


    const combineDateAndTime = (dateString: string, timeString: string) => {
        return new Date(`${dateString.split('T')[0]}T${timeString}:00`);
    };

    const morningAgendamentos = listAgendamentos.filter(agendamento =>
        combineDateAndTime(agendamento.data, agendamento.horario).getHours() < 12
    );
    const afternoonAgendamentos = listAgendamentos.filter(agendamento =>
        combineDateAndTime(agendamento.data, agendamento.horario).getHours() >= 12 &&
        combineDateAndTime(agendamento.data, agendamento.horario).getHours() < 18
    );
    const nightAgendamentos = listAgendamentos.filter(agendamento =>
        combineDateAndTime(agendamento.data, agendamento.horario).getHours() >= 18
    );


    return (
        <div className={styles.content}>
            <h1>Sua agenda</h1>
            <p>Aqui você pode ver todos os clientes e serviços agendados para hoje.</p>

            <div className={styles.datePickerContainer}>
                <input 
                type="date" 
                className={styles.datePicker} 
                onChange={(e) => buscarAgendamentosPorData(e.target.value)}
                />
            </div>

            <div className={styles.section}>
                <h2><span className={styles.icon}>🌞</span>Manhã</h2>
                <div className={styles.timeSlot}>09h-12h</div>
                <div>
                    {morningAgendamentos.map((agendamento) => (
                        <div className={styles.agendamento} key={agendamento.id}>
                            <p>{agendamento.horario}</p>
                            <p>{agendamento.pet} / {agendamento.usuario}</p>
                            <p>{agendamento.servico}</p>
                            <button>Remover agendamento</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h2><span className={styles.icon}>🌤️</span>Tarde</h2>
                <div className={styles.timeSlot}>13h-18h</div>
                <div>
                    {afternoonAgendamentos.map((agendamento) => (
                        <div className={styles.agendamento} key={agendamento.id}>
                            <p><strong></strong> {agendamento.horario}</p>
                            <p><strong></strong> {agendamento.pet} / {agendamento.usuario}</p>
                            <p><strong></strong> {agendamento.servico}</p>
                            <button>Remover agendamento</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h2><span className={styles.icon}>🌙</span>Noite</h2>
                <div className={styles.timeSlot}>19h-21h</div>
                <div>
                    {nightAgendamentos.map((agendamento) => (
                        <div className={styles.agendamento} key={agendamento.id}>
                            <p><strong></strong> {agendamento.horario}</p>
                            <p><strong></strong> {agendamento.pet} / {agendamento.usuario}</p>
                            <p><strong></strong> {agendamento.servico}</p>
                            <button>Remover agendamento</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
