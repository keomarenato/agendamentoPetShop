

export class Agendamento {
  constructor({id, data, horario, observacoes, petId, servicoId, usuarioId, status, telefone, createdAt, updatedAt }) {
    this.id = id
    this.data = new Date(data);this.data = data
    this.horario = horario
    this.observacoes = observacoes
    this.petId = petId
    this.servicoId = servicoId
    this.usuarioId = usuarioId
    this.status =  status || 'PENDENTE'
    this.telefone = telefone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validarHorario() {
    const regex = /^([0-9]{2}):([0-9]{2})$/;
    if (!regex.test(this.horario)) {
      throw new Error('O horário deve estar no formato HH:MM.');
    }
  }

  validarData() {
    if (new Date(this.data) < new Date()) {
        throw new Error('A Data do agendamento nao pode ser no passado')
    }
  }
}