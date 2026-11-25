import { INITIAL_EVENT_MARKETING_DATA } from '../data/eventMarketingMockData';

const STORAGE_KEY_EVENT_MKT = 'curitiba360_events_marketing_v1';

function getStoredMarketing() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_EVENT_MKT);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_EVENT_MKT, JSON.stringify(INITIAL_EVENT_MARKETING_DATA));
      return INITIAL_EVENT_MARKETING_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler marketing do evento:', error);
    return INITIAL_EVENT_MARKETING_DATA;
  }
}

function persistMarketing(data) {
  try {
    localStorage.setItem(STORAGE_KEY_EVENT_MKT, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar marketing do evento:', error);
  }
}

export const eventMarketingService = {
  async getMarketingOverview(eventId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredMarketing();
    return { success: true, data };
  },

  async addCoupon(eventId, couponData) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredMarketing();

    const newCoupon = {
      id: `CUP-${Date.now()}`,
      usosRealizados: 0,
      status: 'ativo',
      ...couponData
    };

    data.cupons.push(newCoupon);
    persistMarketing(data);
    return { success: true, coupon: newCoupon };
  },

  async toggleCouponStatus(couponId, newStatus) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredMarketing();
    const index = data.cupons.findIndex((c) => c.id === couponId);
    if (index === -1) throw new Error('Cupom não encontrado.');

    data.cupons[index].status = newStatus;
    persistMarketing(data);
    return { success: true, coupon: data.cupons[index] };
  }
};
