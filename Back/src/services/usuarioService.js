import { Usuario } from "../entities/Usuario.js";
import agendamentoRepository from "../repositories/agendamentoRepository.js";
import petRepository from "../repositories/petRepository.js";
import usuarioRepository from "../repositories/usuarioRepository.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET


class UsuarioService {

    async criarUsuario(dadosUsuario) {
        const { senha } = dadosUsuario
        const salt = await bcrypt.genSalt(10)
        dadosUsuario.senha = await bcrypt.hash(senha, salt)

        return await usuarioRepository.criarUsuario(dadosUsuario);
    }

    async listarUsuarios() {
        const usuarios = await UsuarioRepository.listarUsuarios()
        return usuarios.map(usuario => new Usuario(usuario))
    }

    async listarUsersTipoUsuario() {
        const usuarioTipo = await UsuarioRepository.listarUsersTipoUsuario()
        return usuarioTipo.map(usuarios => new Usuario(usuarios))
    }

    async buscarUsuarioPorId(id) {
        const usuario = await UsuarioRepository.buscarUsuarioPorId(id)
        if (!usuario) {
            throw new Error('Usuário não encontrado')
        }

        return new Usuario(usuario)
    }

    async listarPetsDoUsuario(usuarioId) {
        return await petRepository.buscarPetsPorUsuarioId(usuarioId)
    }

    async listarAgendamentosDoUsuario(usuarioId) {
        return await agendamentoRepository.buscarAgendamentosPorUsuarioId(usuarioId)
    }

    async buscarUsuarioPorNome(nome) {
      const usuarios = usuarioRepository.buscarUsuarioPorNome(nome) 
        if (!usuarios || usuarios.length === 0) {
            throw new Error('Usuário não encontrado')
        }
       return usuarios
    }

    async atualizarUsuario(id, dadosAtualizados) {
        const usuarioAtualizado = await UsuarioRepository.atualizarUsuario(id, dadosAtualizados)
        return new Usuario(usuarioAtualizado)
    }

    async deletarUsuario(id) {
        await UsuarioRepository.deletarUsuario(id)
        return { message: 'Usuário deletado com sucesso' }
    }


    async login(email, senha) {
        const usuario = await usuarioRepository.buscarUsuarioPorEmail(email)

        if (!usuario) {
            throw new Error('Usuario não encontrado')
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha)
        if (!isMatch) {
            throw new Error('Senha incorreta')
        }

        // Comparar a senha criptografada
        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo },
            secretKey,
            { expiresIn: '1d' }
        )
        return { token, usuario }
    }

    async verificarToken(token) {
        try {
            const decoded = jwt.verify(token, secretKey)
            return decoded
        } catch (error) {
            throw new Error('Token inválido');
        }
    }

}

export default new UsuarioService();