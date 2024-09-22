import { Hospedagem } from "../entities/Hospedagem.js";
import hospedagemRepository from "../repositories/hospedagemRepository.js";


class HospedagemService  {
  async criarHospedagem(dadosHospedagem) {
    const novaHospedagem = new Hospedagem(dadosHospedagem)

    novaHospedagem.validarDatas()
    novaHospedagem.calcularTotal()

    const hospedagemCriada = await hospedagemRepository.criarHospedagem({
      dataInicio: novaHospedagem.dataInicio,
      dataFim: novaHospedagem.dataFim,
      petId: novaHospedagem.petId,
      usuarioId: novaHospedagem.usuarioId,
      diaria: novaHospedagem.diaria,
      total: novaHospedagem.total
    })

    return new Hospedagem(hospedagemCriada)
  }

  async listarHospedagens() {
    const hospedagens  = await hospedagemRepository.listarHospedagens()
    return hospedagens.map(hospedagem => new Hospedagem(hospedagem))
  }

  async buscarHospedagemPorId(id) {
    const hospedagem = await hospedagemRepository.buscarHospedagemPorId(id)
    if(!hospedagem) {
        throw new Error('Hospedagem não encontrada')
    }
    return new Hospedagem(hospedagem)
  }

  async atualizarHospedagem(id, dadosAtualizados) {
    const hospedagemAtualizada = await hospedagemRepository.atualizarHospedagem(id, dadosAtualizados)
    return new Hospedagem(hospedagemAtualizada)
  }

  async deletarHospedagem(id) {
    await hospedagemRepository.deletarHospedagem(id)
    return {message: 'Hospedagem deletada com sucesso'}
  }
}

export default new HospedagemService();