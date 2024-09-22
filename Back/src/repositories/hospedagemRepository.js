import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

class HospedagemRepository {
  async criarHospedagem(dadosHospedagem) {
    return await prisma.hospedagem.create({
      data: dadosHospedagem   
    })
  }

  async listarHospedagens() {
    return await prisma.hospedagem.findMany({
        include: {
            pet: true,
            usuario: true
        }
    })
  }

  async atualizarHospedagem(id, dadosAtualizados) {
    return await prisma.hospedagem.update({
      where: {id: parseInt(id)},
      data: dadosAtualizados
    })
  }

  async deletarHospedagem(id) {
    return await prisma.hospedagem.delete({
        where: {id: parseInt(id)}
    })
  }
}

export default new HospedagemRepository();