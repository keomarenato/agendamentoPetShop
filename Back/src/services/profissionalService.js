import { Profissional } from "../entities/Profissional.js";
import profissionalRepository from "../repositories/profissionalRepository.js";


class ProfissionalService {
  async criarProfissioanl(dadosProfissional) {
    const novoProfissional = new Profissional(dadosProfissional)
    novoProfissional.validarDados()

    return await profissionalRepository.criarProfissional(dadosProfissional)
  }

  async buscarProfissionalPorId(id) {
    const profissional = await profissionalRepository.buscarProfissionalPorId(id)
    if (!profissional) {
      throw new Error("Profissional não encontrado")
    }
    return profissional
  }

  async listarProfissionais() {
    return await profissionalRepository.listarProfissionais()
  }

  async atualizarProfissional(id, dadosAtualizados) {
    return await profissionalRepository.atualizarProfissional(id, dadosAtualizados)
  }

  async deletarProfissional(id) {
    return await profissionalRepository.deletarProfissional(id)
  }

}

export default new ProfissionalService();