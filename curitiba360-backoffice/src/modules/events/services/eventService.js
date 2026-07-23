import { EventRepository } from '../repositories/EventRepository';

export const EventService = {
  async listEvents(filters = {}) {
    const list = await EventRepository.getEvents(filters);
    const receitaTotalGeral = list.reduce((acc, e) => acc + (e.receitaAcumulada || 0), 0);
    const totalVendidosGeral = list.reduce((acc, e) => acc + (e.ingressosVendidos || 0), 0);
    const capacidadeTotalGeral = list.reduce((acc, e) => acc + (e.capacidadeTotal || 0), 0);
    const ocupacaoMediaGeral = capacidadeTotalGeral > 0 ? Math.round((totalVendidosGeral / capacidadeTotalGeral) * 100) : 0;

    return {
      success: true,
      data: list,
      metrics: {
        receitaTotalGeral,
        totalVendidosGeral,
        capacidadeTotalGeral,
        ocupacaoMediaGeral,
        totalEventos: list.length
      }
    };
  },

  async getEventById(eventId) {
    const event = await EventRepository.getEvent(eventId);
    if (!event) {
      throw new Error('Evento não encontrado.');
    }
    return { success: true, data: event };
  },

  async getLotsByEvent(eventId) {
    const lots = await EventRepository.getLots(eventId);
    return { success: true, data: lots };
  },

  async searchEvents(query) {
    const events = await EventRepository.search(query);
    return { success: true, data: events };
  },

  async toggleFavorite(eventId) {
    const favorites = await EventRepository.toggleFavorite(eventId);
    return { success: true, favorites, isFavorite: favorites.includes(eventId) };
  },

  async getFavorites() {
    const favorites = await EventRepository.getFavorites();
    return { success: true, favorites };
  }
};
