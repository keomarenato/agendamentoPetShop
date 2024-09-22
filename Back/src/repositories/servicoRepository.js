import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


 class ServicoRepository {
  async criarServico(dadosServicos) {
    return await prisma.servico.create({
        data: dadosServicos
    })
  }

  async listarServicos() {
    return await prisma.servico.findMany()
  }

  async buscarServicoPorId(servicoId) {
    return await prisma.servico.findUnique({
        where: {id: parseInt(servicoId)}
    })
  }

  async atualizarServico(id, dadosAtualizados) {
    return await prisma.servico.update({
        where: {id: parseInt(id)},
        data: dadosAtualizados
    })
  }

  async deletarServico(id) {
    return await prisma.servico.delete({
        where: {id: parseInt(id)}
    })
  }
}

export default new ServicoRepository();