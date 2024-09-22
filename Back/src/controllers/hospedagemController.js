import hospedagemService from "../services/hospedagemService.js"


export class HospedagemController {
 async criarHospedagem(req, res) {
    try {
      const {dataInicio, dataFim, petId, usuarioId, diaria} = req.body
      const novaHospedagem = await hospedagemService.criarHospedagem({
        dataInicio,dataFim , petId, usuarioId, diaria
      }) 
      return res.status(201).json(novaHospedagem)
    } catch (error) {
        return res.status(400).json({ error: error.message }); 
    }
 }

 async listarHospedagens(req, res) {
    try {
       const hospedagens = await hospedagemService.listarHospedagens() 
       return res.status(200).json(hospedagens)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
 }

 async buscarHospedagemPorId(req, res) {
    try {
      const {id} = req.params
      const hospedagem = await hospedagemService.buscarHospedagemPorId(id)
      return res.status(200).json(hospedagem)
    } catch (error) {
        return res.status(404).json({ error: error.message }); 
    }
 }

 async atualizarHospedagem(req, res) {
    try {
       const {id} = req.params
       const dadosAtualizados = req.body
       const hospedagemAtualizada = await hospedagemService.atualizarHospedagem(id, dadosAtualizados)
       return res.status(200).json(hospedagemAtualizada)
    } catch (error) {
        return res.status(400).json({ error: error.message }); 
    }
 }

 async deletarHospedagem(req, res) {
    try {
      const {id} = req.params
      await hospedagemService.deletarHospedagem(id)
      return res.status(200).json({ message: 'Hospedagem deletada com sucesso' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
 }
}