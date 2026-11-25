import { INITIAL_SEATING_DATA } from '../data/seatingMockData';

const STORAGE_KEY_SEATING = 'curitiba360_events_seating_v1';

function getStoredSeating() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SEATING);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SEATING, JSON.stringify(INITIAL_SEATING_DATA));
      return INITIAL_SEATING_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de mapa de assentos:', error);
    return INITIAL_SEATING_DATA;
  }
}

function persistSeating(data) {
  try {
    localStorage.setItem(STORAGE_KEY_SEATING, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar mapa de assentos:', error);
  }
}

export const seatingService = {
  async getSeatingOverview(eventId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredSeating();
    return { success: true, data };
  },

  async updateSeatStatus(seatId, newStatus) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredSeating();
    const index = data.assentos.findIndex((s) => s.id === seatId);
    if (index === -1) throw new Error('Assento não encontrado.');

    data.assentos[index].status = newStatus;
    persistSeating(data);
    return { success: true, seat: data.assentos[index] };
  },

  async addSector(eventId, sectorData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredSeating();

    const newSector = {
      id: `SEC-${Date.now()}`,
      ...sectorData
    };

    data.setores.push(newSector);
    persistSeating(data);
    return { success: true, sector: newSector };
  }
};
