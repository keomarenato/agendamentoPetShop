export class Pet {
  constructor({ id, nome, tipo, raca, peso, cor, dataNascimento, imagemUrl, usuarioId, createAt, updatedAt }) {
    this.id = id
    this.nome = nome
    this.tipo = tipo
    this.raca = raca
    this.peso = peso
    this.cor = cor
    this.dataNascimento = dataNascimento
    this.imagemUrl = imagemUrl
    this.usuarioId = usuarioId
    this.createAt = createAt
    this.updatedAt = updatedAt
  }

  validarNome() {
    if (!this.nome || this.nome.length < 2) {
      throw new Error('O nome do pet deve ter pelo menos 2 caracteres')
    }
  }
}