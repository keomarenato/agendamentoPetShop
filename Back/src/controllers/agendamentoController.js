import agendamentoService from "../services/agendamentoService.js"


export class AgendamentoController {
    async criarAgendamento(req, res) {
        try {
            const { data, horario, observacoes, petId, servicoId, usuarioId, tipoAgendamento, profissionalId, telefone } = req.body

            let agendamentoData = {
                data,
                horario,
                observacoes,
                petId,
                servicoId,
                usuarioId,
                tipoAgendamento,
                telefone
            }
          
            if (tipoAgendamento === 'CONSULTA_VETERINARIA' && profissionalId) {
                agendamentoData.profissionalId = profissionalId
            }

            const novoAgendamento = await agendamentoService.criarAgendamento(agendamentoData)

            return res.status(201).json(novoAgendamento)   
             
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    

    async listarAgendamentos(req, res) {
        try {
            const agendamentos = await agendamentoService.listarAgendamentos()
            return res.status(200).json(agendamentos)
        } catch (error) {
            console.error("Erro ao listar agendamentos:", error);
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarAgendamentoPorId(req, res) {
        try {
            const { id } = req.params
            const agendamento = await agendamentoService.buscarAgendamentPorId(id)
            return res.status(200).json(agendamento)
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }


    async buscarAgendamentosPorData(req, res) {
        try {
           const {data} = req.query // A data vem como um query param
           const agendmentos = await agendamentoService.buscarAgendamentosPorData(data)
           return res.status(200).json(agendmentos)
        } catch (error) {
            return res.status(404).json({ error: error.message });  
        }
    }

    async atualizarAgendamento(req, res) {
        try {
            const { id } = req.params
            const dadosAtualizados = req.body
            const agendamentoAtualizado = await agendamentoService.atualizarAgendamento(id, dadosAtualizados)
            return res.status(200).json(agendamentoAtualizado)
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletarAgendamento(req, res) {
        try {
            const { id } = req.params
            await agendamentoService.deletarAgendamento(id)
            return res.status(200).json({ message: 'Agendamento deletado com sucessso' })
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}