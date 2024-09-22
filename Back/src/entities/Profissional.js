

export class Profissional {
  constructor({ id, nome, especialidade, telefone, createdAt, updatedAt }) {
    this.id = id
    this.nome = nome
    this.especialidade = especialidade
    this.telefone = telefone
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  validarDados() {
    if (!this.nome || !this.especialidade || !this.telefone) {
      throw new Error('Todos os campso obrigatório devem ser preenchidos')
    }
  }
}