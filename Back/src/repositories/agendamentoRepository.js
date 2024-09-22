 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


class AgendamentoRepository  {
    async criarAgendamento(dadosAgendamento) {
        return await prisma.agendamento.create({
          data: dadosAgendamento   
        })
    } 

    async listarAgendamentos() {
        return await prisma.agendamento.findMany({
            include: {
                pet: {
                    select: {
                        nome: true
                    }
                },
                servico: {
                    select: {
                        nome: true,
                        duracao: true
                    }
                },
                usuario: {
                    select: {
                        nome: true
                    }
                }
            }
        });
    }

   async buscarAgendamentoPorId(id) {
    return await prisma.agendamento.findUnique({
        where: {id: parseInt(id)},
        include: {
            pet: true,
            servico: true,
            usuario: true
        }
    })
   }

    
   async buscarAgendamentosPorUsuarioId(usuarioId) {
    return await prisma.agendamento.findMany({
        where: { usuarioId: parseInt(usuarioId)},
        include: {
            pet: true,
            servico: true
        }
    })
   }


    async buscarAgendamentosPorData(data) {
        return await prisma.agendamento.findMany({
            where: {
                data: {
                    gte: new Date(`${data}T00:00:00Z`), // Início do dia
                    lt: new Date(`${data}T23:59:59Z`)   // Final do dia
                }
            },
            include: {
                pet: true,
                servico: true,
                usuario: true
            }
        })
    }


   async atualizarAgendamento(id, dadosAtualizados) {
    return await prisma.agendamento.update({
        where: {id: parent(id)},
        data: dadosAtualizados
    })
   }

   async deletarAgendamento(id) {
    return await prisma.agendamento.delete({
        where: {id: parseInt(id)}
    })
   }

}

export default new AgendamentoRepository();