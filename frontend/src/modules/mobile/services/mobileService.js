import { INITIAL_MOBILE_PRODUCER_DATA } from '../data/mobileMockData';

const STORAGE_KEY_MOBILE_APP = 'curitiba360_mobile_producer_v1';

function getStoredMobile() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_MOBILE_APP);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_MOBILE_APP, JSON.stringify(INITIAL_MOBILE_PRODUCER_DATA));
      return INITIAL_MOBILE_PRODUCER_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados mobile:', error);
    return INITIAL_MOBILE_PRODUCER_DATA;
  }
}

function persistMobile(data) {
  try {
    localStorage.setItem(STORAGE_KEY_MOBILE_APP, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados mobile:', error);
  }
}

export const mobileService = {
  async getMobileOverview() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredMobile();
    return { success: true, data };
  },

  async toggleBiometrics() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredMobile();
    data.userProfile.biometriaAtiva = !data.userProfile.biometriaAtiva;
    persistMobile(data);
    return { success: true, biometriaAtiva: data.userProfile.biometriaAtiva };
  },

  async toggleOfflineMode() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredMobile();
    data.userProfile.modoOffline = !data.userProfile.modoOffline;
    persistMobile(data);
    return { success: true, modoOffline: data.userProfile.modoOffline };
  },

  async markNotificationAsRead(id) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredMobile();
    const index = data.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      data.notifications[index].lida = true;
      persistMobile(data);
    }
    return { success: true };
  }
};
