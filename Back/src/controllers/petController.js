import petService from "../services/petService.js"


export class PetController {
  async criarPet(req, res) {
    try {
      const { nome, tipo, raca, peso, cor, dataNascimento, usuarioId } = req.body

     

      let imagemUrl = null
      if (req.file) {
        imagemUrl = `/images/${req.file.filename}`;
      }

      const novoPet = await petService.criarPet({
        nome,
        tipo,
        raca,
        peso: parseFloat(peso),
        cor,
        dataNascimento,
        imagemUrl,
        usuarioId: parseInt(usuarioId),
      })
      return res.status(201).json(novoPet)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarPets(req, res) {
    try {
      const pets = await petService.listarPets()
      return res.status(200).json(pets)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarPetPorId(req, res) {
    try {
      const { id } = req.params
      const pet = await petService.buscarPetPorId(id)
      return res.status(200).json(pet)
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async atualizarPet(req, res) {
    try {
      const { id } = req.params
      const dadosAtualizados = req.body
      const petAtualizado = await petService.atualizarPet(id, dadosAtualizados)
      return res.status(200).json(petAtualizado)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deletarPet(req, res) {
    try {
      const { id } = req.params
      await petService.deletarPet(id)
      return res.status(200).json({ message: 'Pet deletado com sucesso' })
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}