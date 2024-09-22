import { Pet } from "../entities/Pet.js";
import petRepository from "../repositories/petRepository.js";


class PetService {
   async criarPet(dadosPet) {
     const novoPet = new Pet(dadosPet)

     novoPet.validarNome()

     const petCriado = await petRepository.criarPet(dadosPet)
     return new Pet(petCriado)
   }

   async listarPets() {
    const pets = await petRepository.listarPets()
    
    const reuslt = pets.map(pet => ({
      id: pet.id,
      nome: pet.nome,
      tipo: pet.tipo,
      raca: pet.raca,
      peso: pet.peso,
      cor: pet.cor,
      dataNascimento: pet.dataNascimento,
      imagemUrl: pet.imagemUrl,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      usuario: pet.usuario ? {nome: pet.usuario.nome} : null
    }))
   
    console.log(reuslt)
    return reuslt
   }


   async buscarPetPorId(id) {
    const pet = await petRepository.buscarPetPorId(id)
    if (!pet) {
        throw new Error('Pet não encontrado');
    }
    return new Pet(pet);
   }

   async atualizarPet(id, dadosAtualizados) {
    const petAtualizado = await petRepository.atualizarPet(id, dadosAtualizados)
    return new Pet(petAtualizado)
   }

   async deletarPet(id) {
    await petRepository.deletarPet(id)
    return {message: 'Pet deletado com sucesso'}
   }
}

export default new PetService();