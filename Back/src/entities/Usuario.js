export  class Usuario {
  constructor({id, nome, email, telefone, senha, tipo, createdAt, updatedAt }) {
    this.id = id
    this.nome = nome
    this.email = email
    this.telefone = telefone
    this.senha = senha
    this.tipo = tipo
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  validarEmail() {
    if(!this.email.includes('@')) {
        throw new Error('Email inválido')
    }
  }

  isAdmin() {
    return this.tipo === 'ADMINISTRADOR'
  }
}