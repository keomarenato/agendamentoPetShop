import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()



class ProfissionalRepository {
  async criarProfissional(dadosProfissional) {
    return await prisma.profissional.create({
      data: dadosProfissional
    })
  }

  async buscarProfissionalPorId(id) {
    return await prisma.profissional.findUnique({
      where: { id: parseInt(id) }
    })
  }

  async listarProfissionais() {
    return await prisma.profissional.findMany()
  }

  async atualizarProfissional(id, dadosAtualizados) {
    return await prisma.profissional.update({
      where: { id: parseInt(id) },
      data: dadosAtualizados
    })
  }

  async deletarProfissional(id) {
    return await prisma.profissional.delete({
      where: { id: parseInt(id) }
    })
  }
}

export default new ProfissionalRepository();