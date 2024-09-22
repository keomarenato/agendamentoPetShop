

export class Servico {
  constructor({id, nome, duracao, preco, imagemServico, descricao, createdAt, updatedAt}) {
    this.id = id
    this.nome = nome
    this.duracao = duracao
    this.preco = preco
    this.descricao = descricao
    this.imagemServico = imagemServico
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  validarNome() {
    if (!this.nome || this.nome.length < 2) {
        throw new Error("O nome do servio deve ter pelo menos 2 caracteres")
    }
  }

  validarPreco() {
    if (this.preco <= 0) {
        throw new Error('O preço deve ser maior que zero.');
    }
  }
}