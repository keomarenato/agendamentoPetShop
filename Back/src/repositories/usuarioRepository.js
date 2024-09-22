import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


class UsuarioRepository {
    async criarUsuario(dadosUsuario) {
        return await prisma.usuario.create({
            data: dadosUsuario
        })
    }

    async listarUsuarios() {
        return await prisma.usuario.findMany()
    }

    async listarUsersTipoUsuario() {
        return await prisma.usuario.findMany({
            where: { tipo: 'USUARIO' }
        })
    }

    async buscarUsuarioPorId(id) {
        return await prisma.usuario.findUnique({
            where: { id: parseInt(id) }
        })
    }

    async buscarUsuarioPorNome(nome) {
        return await prisma.usuario.findMany({
            where: {
                nome: {
                    contains: nome,
                    mode: 'insensitive'
                }
            }
        })
    }

    async atualizarUsuario(id, dadosAtualizados) {
        return await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: dadosAtualizados
        })
    }

    async deletarUsuario(id) {
        return await prisma.usuario.delete({
            where: { id: parseInt(id) }
        })
    }

    async buscarUsuarioPorEmail(email) {
        return await prisma.usuario.findUnique({
            where: { email }
        })
    }
}

export default new UsuarioRepository();