import { Agendamento } from "../entities/Agendamento.js";
import agendamentoRepository from "../repositories/agendamentoRepository.js";
import profissionalRepository from "../repositories/profissionalRepository.js";
import servicoRepository from "../repositories/servicoRepository.js";


class AgendamentoService {
   async criarAgendamento(dadosAgendamento) {
      const { servicoId, tipoAgendamento, profissionalId} = dadosAgendamento


      const servico = await servicoRepository.buscarServicoPorId(servicoId);
      if (!servico) {
         throw new Error('Serviço não encontrado')
      }


      if (tipoAgendamento === 'CONSULTA_VETERINARIA') {
         if (!profissionalId) {
             throw new Error('Profissional é obrigatório para consultas veterinárias');
         }
     
         const profissional = await profissionalRepository.buscarProfissionalPorId(profissionalId);
         if (!profissional) {
             throw new Error('Profissional não encontrado');
         }
     }

       return await agendamentoRepository.criarAgendamento(dadosAgendamento);
   }


   async listarAgendamentos() {
      const agendamentos = await agendamentoRepository.listarAgendamentos()
      
      return agendamentos.map(agendamento => ({
       id: agendamento.id,
       data: agendamento.data,
       horario: agendamento.horario,
       observacoes: agendamento.observacoes,
       pet: agendamento.pet.nome,
       servico: agendamento.servico.nome,
       usuario: agendamento.usuario.nome,
       status: agendamento.status,
       telefone: agendamento.telefone
      }))
       
   }

   async buscarAgendamentPorId(id) {
      const agendamento = await agendamentoRepository.buscarAgendamentoPorId(id)
      if (!agendamento) {
         throw new Error('Agendamento não encontrado')
      }

      return new Agendamento(agendamento)
   }

   async buscarAgendamentosPorData(data) {
      const agendamentos = await agendamentoRepository.buscarAgendamentosPorData(data)
      if(!agendamentos || agendamentos.length === 0 ) {
         throw new Error('Nenhum agendamento encontrado para essa data');
      }

      return agendamentos.map(agendamento => ({
        id: agendamento.id,
        data: agendamento.data,
        horario: agendamento.horario,
        pet: agendamento.pet.nome,
        servico: agendamento.servico.nome,
        usuario: agendamento.usuario.nome
      }))
   }

   async atualizarAgendamento(id, dadosAgendamento) {
      const agendamentoAtualizado = await agendamentoRepository.atualizarAgendamento(id, dadosAtualizados)
      return new Agendamento(agendamentoAtualizado)
   }

   async deletarAgendamento(id) {
      await agendamentoRepository.deletarAgendamento(id)
      return { message: 'Agendamento deletado com sucesso' }
   }
}

export default new AgendamentoService();