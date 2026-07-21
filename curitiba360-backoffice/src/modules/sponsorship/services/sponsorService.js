import { INITIAL_SPONSOR_DATA } from '../data/sponsorMockData';

const STORAGE_KEY_SPONSOR = 'curitiba360_sponsor_v1';

function getStoredSponsor() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SPONSOR);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SPONSOR, JSON.stringify(INITIAL_SPONSOR_DATA));
      return INITIAL_SPONSOR_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de patrocínios:', error);
    return INITIAL_SPONSOR_DATA;
  }
}

export const sponsorService = {
  async getSponsorOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredSponsor();
    return { success: true, data };
  }
};
