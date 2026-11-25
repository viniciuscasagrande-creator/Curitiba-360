import { INITIAL_MKT_DATA } from '../data/mktMockData';

const STORAGE_KEY_MKT = 'curitiba360_mkt_v1';

function getStoredMkt() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_MKT);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_MKT, JSON.stringify(INITIAL_MKT_DATA));
      return INITIAL_MKT_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de marketing:', error);
    return INITIAL_MKT_DATA;
  }
}

export const mktService = {
  async getMktOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredMkt();
    return { success: true, data };
  }
};
