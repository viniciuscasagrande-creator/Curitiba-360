import { EventRepository } from '../repositories/EventRepository';
import { INITIAL_EVENTS_DATA } from '../data/eventsMockData';

const STORAGE_KEY_EVENTS = 'curitiba360_events360_list_v1';

function getStoredEvents() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_EVENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_EVENTS_DATA));
      return INITIAL_EVENTS_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler lista de eventos:', error);
    return INITIAL_EVENTS_DATA;
  }
}

function persistEvents(data) {
  try {
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar eventos:', error);
  }
}

export const EventService = {
  async listEvents(filters = {}) {
    let list;
    try {
      list = await EventRepository.getEvents(filters);
    } catch {
      list = getStoredEvents();
    }
    if (!Array.isArray(list) || list.length === 0) {
      list = getStoredEvents();
    }

    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter((e) =>
        (e.nome || e.title || '').toLowerCase().includes(term) ||
        (e.categoria || e.category || '').toLowerCase().includes(term) ||
        (e.organizador || '').toLowerCase().includes(term) ||
        (e.venue || e.location || '').toLowerCase().includes(term)
      );
    }

    if (filters.status && filters.status !== 'todos') {
      list = list.filter((e) => e.status === filters.status);
    }

    if (filters.categoria && filters.categoria !== 'todas') {
      list = list.filter((e) => (e.categoria || e.category || '').toLowerCase() === filters.categoria.toLowerCase());
    }

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
    try {
      const event = await EventRepository.getEvent(eventId);
      if (event) return { success: true, data: event };
    } catch {
      // Fallback to stored mock events
    }
    const list = getStoredEvents();
    const eventItem = list.find((e) => e.id === eventId) || list[0];
    if (!eventItem) throw new Error('Evento não encontrado.');
    return { success: true, data: eventItem };
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
  },

  async createEvent(eventData) {
    let list = getStoredEvents();
    const newEvent = {
      id: `EVT-${Math.floor(Math.random() * 1000 + 9000)}`,
      status: 'rascunho',
      ingressosVendidos: 0,
      ocupacaoPct: 0,
      receitaAcumulada: 0,
      lotes: eventData.lotes || [
        { id: `LOT-${Date.now()}`, nome: '1º Lote Promo', preco: eventData.precoBase || 100, qtdTotal: eventData.capacidadeTotal || 100, qtdVendida: 0, status: 'ativo' }
      ],
      iaPrediction: {
        previsaoOcupacaoFinal: '85% estimativa inicial',
        demandaNivel: 'Em Análise ⚖️',
        sugestaoPreco: 'Recomenda-se iniciar com 1º lote promocional por 14 dias.'
      },
      ...eventData
    };
    list = [newEvent, ...list];
    persistEvents(list);
    return { success: true, data: newEvent };
  },

  async updateEventStatus(eventId, newStatus) {
    let list = getStoredEvents();
    const index = list.findIndex((e) => e.id === eventId);
    if (index === -1) throw new Error('Evento não encontrado.');
    list[index].status = newStatus;
    persistEvents(list);
    return { success: true, data: list[index] };
  },

  async saveBatches(eventId, lotes) {
    let list = getStoredEvents();
    const index = list.findIndex((e) => e.id === eventId);
    if (index === -1) throw new Error('Evento não encontrado.');
    list[index].lotes = lotes;
    persistEvents(list);
    return { success: true, data: list[index] };
  }
};

export const eventService = EventService;
export default EventService;
