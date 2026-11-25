import { INITIAL_CHECKIN_DATA } from '../data/checkinMockData';

const STORAGE_KEY_CHECKIN = 'curitiba360_events_checkin_v1';

function getStoredCheckin() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CHECKIN);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_CHECKIN, JSON.stringify(INITIAL_CHECKIN_DATA));
      return INITIAL_CHECKIN_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de check-in:', error);
    return INITIAL_CHECKIN_DATA;
  }
}

function persistCheckin(data) {
  try {
    localStorage.setItem(STORAGE_KEY_CHECKIN, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de check-in:', error);
  }
}

export const checkinService = {
  async getCheckinOverview(eventId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredCheckin();
    return { success: true, data };
  },

  async validateQrCode(qrCode) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredCheckin();

    const ticket = data.ingressosParaValidar.find((t) => t.qrCode === qrCode || t.ticketId === qrCode);

    if (!ticket) {
      return { success: false, message: '❌ Ingresso não encontrado ou inválido!' };
    }

    if (ticket.dataCheckin) {
      return { success: false, message: `⚠️ Ingresso JÁ UTILIZADO em ${ticket.dataCheckin}!`, ticket };
    }

    ticket.dataCheckin = new Date().toLocaleString('pt-BR');
    data.checkinsRealizados += 1;
    data.checkinsPendentes -= 1;

    persistCheckin(data);
    return { success: true, message: '✅ Check-in REALIZADO COM SUCESSO!', ticket };
  }
};
