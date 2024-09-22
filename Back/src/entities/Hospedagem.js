

export class Hospedagem {
    constructor({ id, dataInicio, dataFim, petId, usuarioId, diaria, total, createdAt, updatedAt }) {
        this.id = id
        this.dataInicio = dataInicio
        this.dataFim = dataFim
        this.petId = petId
        this.usuarioId = usuarioId
        this.diaria = diaria
        this.total = total
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    validarDatas() {
        if(new Date(this.dataInicio) > new Date(this.dataFim)) {
            throw new Error('A data de inicio nao pode ser maior que a data de fim')
        }
    }

    calcularTotal() {
      const dias = (new Date(this.dataFim) - new Date(this.dataInicio)) / (1000 * 60 * 60 * 24)
      this.total = dias * this.diaria
    }
}