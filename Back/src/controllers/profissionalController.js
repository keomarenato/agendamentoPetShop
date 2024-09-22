import profissionalService from "../services/profissionalService.js";


export class ProfissionalController {
  async criarProfissional(req, res) {
    try {
      const profissional = await profissionalService.criarProfissioanl(req.body)
      return res.status(201).json(profissional)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarProfissionais(req, res) {
    try {
      const profissionais = await profissionalService.listarProfissionais()
      return res.status(200).json(profissionais)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarProfissionalPorId(req, res) {
    try {
      const { id } = req.params
      const profissional = await profissionalService.buscarProfissionalPorId(id)
      return res.status(200).json(profissional)
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async atualizarProfissional(req, res) {
    try {
      const { id } = req.params
      const dadosAtualizados = req.body
      const profissionalAtualizado = await profissionalService.atualizarProfissional(id, dadosAtualizados)
      return res.status(200).json(profissionalAtualizado)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deletarProfissional(req, res) {
    try {
      const { id } = req.params
      await profissionalService.deletarProfissional(id)
      return res.status(200).json({ message: 'Profissional deletado com sucesso' })
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}