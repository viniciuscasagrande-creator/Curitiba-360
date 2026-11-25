import { INITIAL_OFFLINE_CHECKIN_DATA } from '../data/offlineCheckinMockData';

const STORAGE_KEY_OFFLINE_CHECKIN = 'curitiba360_offline_checkin_v1';

function getStoredOfflineCheckin() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_OFFLINE_CHECKIN);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_OFFLINE_CHECKIN, JSON.stringify(INITIAL_OFFLINE_CHECKIN_DATA));
      return INITIAL_OFFLINE_CHECKIN_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de check-in offline:', error);
    return INITIAL_OFFLINE_CHECKIN_DATA;
  }
}

function persistOfflineCheckin(data) {
  try {
    localStorage.setItem(STORAGE_KEY_OFFLINE_CHECKIN, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de check-in offline:', error);
  }
}

export const offlineCheckinService = {
  async getOfflineCheckinOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredOfflineCheckin();
    return { success: true, data };
  },

  async validateOfflineCode(code) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredOfflineCheckin();

    const ticket = data.testTickets.find((t) => t.code === code || t.ticketId === code);

    const currentTime = new Date().toLocaleTimeString('pt-BR');

    if (!ticket || ticket.status === 'cancelado') {
      const log = { id: `LOG-${Date.now()}`, code, comprador: 'Desconhecido', statusResult: 'INVÁLIDO', horario: currentTime, syncStatus: 'pendente' };
      data.accessLogs.unshift(log);
      data.networkStatus.pendingSyncCount += 1;
      persistOfflineCheckin(data);
      return { success: false, statusType: 'invalid', message: '❌ INGRESSO INVÁLIDO OU CANCELADO!', ticket };
    }

    if (ticket.status === 'ja_usado' || ticket.dataCheckin) {
      const log = { id: `LOG-${Date.now()}`, code, comprador: ticket.comprador, statusResult: 'DUPLICADO', horario: currentTime, syncStatus: 'pendente' };
      data.accessLogs.unshift(log);
      data.networkStatus.pendingSyncCount += 1;
      persistOfflineCheckin(data);
      return { success: false, statusType: 'duplicate', message: `⚠️ BLOQUEIO DE DUPLICIDADE: Usado em ${ticket.dataCheckin}!`, ticket };
    }

    // Acesso válido
    ticket.status = 'ja_usado';
    ticket.dataCheckin = new Date().toLocaleString('pt-BR');

    const log = { id: `LOG-${Date.now()}`, code, comprador: ticket.comprador, statusResult: 'APROVADO', horario: currentTime, syncStatus: 'pendente' };
    data.accessLogs.unshift(log);
    data.networkStatus.pendingSyncCount += 1;

    persistOfflineCheckin(data);
    return { success: true, statusType: 'approved', message: '✅ ACESSO APROVADO! BEM-VINDO!', ticket };
  },

  async syncOfflineQueue() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let data = getStoredOfflineCheckin();

    data.accessLogs = data.accessLogs.map((l) => ({ ...l, syncStatus: 'sincronizado' }));
    data.networkStatus.pendingSyncCount = 0;
    data.networkStatus.lastSyncTime = new Date().toLocaleString('pt-BR');

    persistOfflineCheckin(data);
    return { success: true, message: '🎉 Todas as leituras offline foram sincronizadas com o Firestore!' };
  }
};
