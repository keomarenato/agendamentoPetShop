import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

class PetRepository {
   async criarPet(dadosPet) {
    return await prisma.pet.create({
        data: dadosPet
    })
   }
   

   async listarPets() {
    const pets = await prisma.pet.findMany({
        include: {
          usuario: {
            select: {
              nome: true
            }
          }
        }
      });
      console.log(pets);
      return pets
   }

   async buscarPetPorId(id) {
    return await prisma.pet.findUnique({
     where: {id: parent(id)}
    })
   }

   async buscarPetsPorUsuarioId(usuarioId) {
    return await prisma.pet.findMany({
        where: {usuarioId: parseInt(usuarioId)}
    })
   }

   async atualizarPet(id, dadosAtualizados) {
    return await prisma.pet.update({
        where: {id: parseInt(id)},
        data: dadosAtualizados
    })
   }

   async deletarPet(id) {
    return await prisma.pet.delete({
        where: {id: parseInt(id)}
    })
   }
}

export default new PetRepository();