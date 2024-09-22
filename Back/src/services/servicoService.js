import { Servico } from "../entities/Servico.js";
import servicoRepository from "../repositories/servicoRepository.js";



class ServicoService {
 async criarServico(dadosServicos) {
    const novoServico = new Servico(dadosServicos)

    novoServico.validarNome()
    novoServico.validarPreco()

    const servicoCriado = await servicoRepository.criarServico(dadosServicos)
    return new Servico(servicoCriado)
 }

  
 async listarServicos() {
    const servicos = await servicoRepository.listarServicos()
    return servicos.map(servico => new Servico(servico))
 }


 async atualizarServico(id, dadosAtualizados) {
    const servicoAtualizado = await servicoRepository.atualizarServico(id, dadosAtualizados)
    return new Servico(servicoAtualizado)
 }


  async deletarServico(id) {
    await servicoRepository.deletarServico(id)
    return {message: 'Serviço deletado com sucesso'}
  }

}

export default new ServicoService();