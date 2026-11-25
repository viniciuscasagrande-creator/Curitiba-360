import { INITIAL_EVENTS_DATA } from '../data/eventsMockData';

const STORAGE_KEY_EVENTS = 'curitiba360_events360_list_v1';
const STORAGE_KEY_FAVORITES = 'curitiba360:favorites';

function getStoredEvents() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_EVENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_EVENTS_DATA));
      return INITIAL_EVENTS_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler EventRepository:', error);
    return INITIAL_EVENTS_DATA;
  }
}

function persistEvents(events) {
  try {
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(events));
  } catch (error) {
    console.error('Erro ao persistir EventRepository:', error);
  }
}

export const EventRepository = {
  async getEvents(filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let list = getStoredEvents();

    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter((e) =>
        e.nome.toLowerCase().includes(term) ||
        (e.categoria && e.categoria.toLowerCase().includes(term)) ||
        (e.organizador && e.organizador.toLowerCase().includes(term)) ||
        (e.venue && e.venue.toLowerCase().includes(term))
      );
    }

    if (filters.cidade && filters.cidade !== 'todas') {
      list = list.filter((e) => e.cidade && e.cidade.toLowerCase() === filters.cidade.toLowerCase());
    }

    if (filters.categoria && filters.categoria !== 'todas') {
      list = list.filter((e) => e.categoria && e.categoria.toLowerCase() === filters.categoria.toLowerCase());
    }

    if (filters.gratuito) {
      list = list.filter((e) => e.lotes && e.lotes.some((l) => l.preco === 0));
    }

    if (filters.acessivel) {
      list = list.filter((e) => e.acessibilidade === true || e.acessivel === true);
    }

    if (filters.precoMax) {
      list = list.filter((e) => e.lotes && e.lotes.some((l) => l.preco <= filters.precoMax));
    }

    // Ordenação
    if (filters.ordenacao === 'preco_asc') {
      list.sort((a, b) => {
        const minA = Math.min(...(a.lotes?.map((l) => l.preco) || [0]));
        const minB = Math.min(...(b.lotes?.map((l) => l.preco) || [0]));
        return minA - minB;
      });
    } else if (filters.ordenacao === 'preco_desc') {
      list.sort((a, b) => {
        const maxA = Math.max(...(a.lotes?.map((l) => l.preco) || [0]));
        const maxB = Math.max(...(b.lotes?.map((l) => l.preco) || [0]));
        return maxB - maxA;
      });
    } else if (filters.ordenacao === 'data') {
      list.sort((a, b) => new Date(a.dataInicio || 0) - new Date(b.dataInicio || 0));
    }

    return list;
  },

  async getEvent(eventId) {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const list = getStoredEvents();
    return list.find((e) => e.id === eventId) || null;
  },

  async getLots(eventId) {
    const event = await this.getEvent(eventId);
    return event ? event.lotes || [] : [];
  },

  async search(query) {
    return this.getEvents({ search: query });
  },

  async getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async toggleFavorite(eventId) {
    const favs = await this.getFavorites();
    const index = favs.indexOf(eventId);
    let updated;
    if (index >= 0) {
      updated = favs.filter((id) => id !== eventId);
    } else {
      updated = [...favs, eventId];
    }
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar favorito:', e);
    }
    return updated;
  }
};
