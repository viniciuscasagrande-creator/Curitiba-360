import { TourismRepository } from '../repositories/TourismRepository';

export class ReservationService {
  constructor(repository = TourismRepository) {
    this.repository = repository;
  }

  async createReservation(input) {
    if (!input.attractionId) throw new Error('Atrativo é obrigatório.');
    if (!input.visitDate) throw new Error('Data de visita é obrigatória.');
    if (!input.participants || input.participants.length === 0) {
      throw new Error('Informe ao menos um participante.');
    }

    return this.repository.createReservation(input);
  }

  async getUserReservations(userId) {
    return this.repository.getUserReservations(userId);
  }

  async cancelReservation(reservationId) {
    return this.repository.cancelReservation(reservationId);
  }
}

export const reservationService = new ReservationService(TourismRepository);
