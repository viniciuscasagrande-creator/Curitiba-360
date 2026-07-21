import { INITIAL_COMMUNICATION_DATA } from '../data/communicationMockData';

const STORAGE_KEY_COMMUNICATION_APP = 'curitiba360_communication_mobile_v1';

function getStoredCommunication() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_COMMUNICATION_APP);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_COMMUNICATION_APP, JSON.stringify(INITIAL_COMMUNICATION_DATA));
      return INITIAL_COMMUNICATION_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de comunicação:', error);
    return INITIAL_COMMUNICATION_DATA;
  }
}

function persistCommunication(data) {
  try {
    localStorage.setItem(STORAGE_KEY_COMMUNICATION_APP, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de comunicação:', error);
  }
}

export const communicationService = {
  async getCommunicationOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredCommunication();
    return { success: true, data };
  },

  async sendMessage(text, isPriority = false) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredCommunication();

    const newMsg = {
      id: `MSG-${Date.now()}`,
      autor: 'Você (Staff)',
      cargo: 'Operação',
      texto: text,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      prioritaria: isPriority
    };

    data.mensagens.push(newMsg);
    persistCommunication(data);
    return { success: true, message: newMsg };
  },

  async acknowledgeAlert(alertId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredCommunication();
    const index = data.alertasUrgentes.findIndex((a) => a.id === alertId);
    if (index !== -1) {
      data.alertasUrgentes[index].lido = true;
      persistCommunication(data);
    }
    return { success: true };
  }
};
