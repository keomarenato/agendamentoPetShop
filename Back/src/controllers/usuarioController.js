import UsuarioService from "../services/usuarioService.js"


export class UsuarioController {
  async criarUsuario(req, res) {
    try {
      const { nome, email, telefone, senha, tipo } = req.body;
      const novoUsuario = await UsuarioService.criarUsuario({ nome, email, telefone, senha, tipo });
      return res.status(201).json(novoUsuario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.listarUsuarios()
      return res.status(200).json(usuarios)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listarUsersTipoUsuario(req, res) {
    try {
      const usuarioTipo = await UsuarioService.listarUsersTipoUsuario()
      return res.status(200).json(usuarioTipo)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params
      const usuario = await UsuarioService.buscarUsuarioPorId(id)
      return res.status(200).json(usuario)
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async listarPetsDoUsuario(req, res) {
    try {
      const { id } = req.params
      const pets = await UsuarioService.listarPetsDoUsuario(id)
      return res.status(200).json(pets)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarAgendamentosDoUsuario(req, res) {
    try {
      const { id } = req.params
      const agendamentos = await UsuarioService.listarAgendamentosDoUsuario(id)
      return res.status(200).json(agendamentos)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


  async listarPetsPorNome(req, res) {
    try {

      const {nome} = req.query
      const usuarios = await UsuarioService.buscarUsuarioPorNome(nome)

    if(!usuarios) {
      return res.status(404).json({message: 'Usuário não encontrado'})
    }

      const usuario = usuarios[0]
      const pets = await UsuarioService.listarPetsDoUsuario(usuario.id)
      return res.status(200).json(pets)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


  async atualizarUsuario(req, res) {
    try {
      const { id } = req.params
      const dadosAtualizados = req.body
      const usuarioAtualizado = await UsuarioService.atualizarUsuario(id, dadosAtualizados)
      return res.status(200).json(usuarioAtualizado)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deletarUsuario(req, res) {
    try {
      const { id } = req.params
      await UsuarioService.deletarUsuario(id)
      return res.status(200).json({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


}