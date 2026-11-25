import { INITIAL_TICKETING_DATA } from '../data/ticketingMockData';

const STORAGE_KEY_TICKETING = 'curitiba360_events_ticketing_v1';

function getStoredTicketing() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_TICKETING);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_TICKETING, JSON.stringify(INITIAL_TICKETING_DATA));
      return INITIAL_TICKETING_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de ticketing:', error);
    return INITIAL_TICKETING_DATA;
  }
}

function persistTicketing(data) {
  try {
    localStorage.setItem(STORAGE_KEY_TICKETING, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de ticketing:', error);
  }
}

export const ticketingService = {
  async getTicketingOverview(eventId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredTicketing();
    return { success: true, data };
  },

  async addLot(eventId, lotData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredTicketing();

    const newLot = {
      id: `LOT-${Date.now()}`,
      status: 'ativo',
      qtdVendida: 0,
      viradaPorData: true,
      viradaPorCota: true,
      ...lotData
    };

    data.lotesComerciais.push(newLot);
    persistTicketing(data);
    return { success: true, lot: newLot };
  },

  async updateLotStatus(lotId, newStatus) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredTicketing();
    const index = data.lotesComerciais.findIndex((l) => l.id === lotId);
    if (index === -1) throw new Error('Lote não encontrado.');

    data.lotesComerciais[index].status = newStatus;
    persistTicketing(data);
    return { success: true, lot: data.lotesComerciais[index] };
  },

  async updateChannelQuota(channelId, newQuota) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredTicketing();
    const index = data.canaisVenda.findIndex((c) => c.canalId === channelId);
    if (index === -1) throw new Error('Canal não encontrado.');

    data.canaisVenda[index].cotaAlocada = parseInt(newQuota, 10) || 0;
    persistTicketing(data);
    return { success: true, channel: data.canaisVenda[index] };
  }
};
