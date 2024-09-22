import servicoService from "../services/servicoService.js"


export class ServicoController {
    async criarServico(req, res) {
        try {
            const { nome, duracao, preco, tipo, descricao } = req.body

            const duracaoInt = parseInt(duracao, 10)
            const precoFloat = parseFloat(preco)

            let imagemUrl = null
            if (req.file) {
                imagemUrl = `/images/${req.file.filename}`;  
            }

            const novoServico = await servicoService.criarServico({
                 nome, 
                 duracao: duracaoInt,
                 preco: precoFloat,
                 descricao,
                 tipo, 
                 imagemServico: imagemUrl 
                })

            return res.status(201).json(novoServico)
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listarServicos(req, res) {
        try {
            const servicos = await servicoService.listarServicos()
            return res.status(200).json(servicos)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarServicoPorId(req, res) {
        try {
            const { id } = req.params
            const servico = await servicoService.buscarServicoPorId(id)
            return res.status(200).json(servico)
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    async atualizarServico(req, res) {
        try {
            const { id } = req.params
            const dadosAtualizados = req.body
            const servicoAtualizado = await servicoService.atualizarServico(id, dadosAtualizados)
            return res.status(200).json(servicoAtualizado)
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletarServico(req, res) {
        try {
            const { id } = req.params
            await servicoService.deletarServico(id)
            return res.status(200).json({ message: 'Serviço deletado com sucesso' })
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}