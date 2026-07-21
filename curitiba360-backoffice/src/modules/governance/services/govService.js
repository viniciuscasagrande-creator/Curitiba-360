import { INITIAL_GOV_DATA } from '../data/govMockData';

const STORAGE_KEY_GOV = 'curitiba360_gov_v1';

function getStoredGov() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_GOV);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_GOV, JSON.stringify(INITIAL_GOV_DATA));
      return INITIAL_GOV_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de governança:', error);
    return INITIAL_GOV_DATA;
  }
}

export const govService = {
  async getGovOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredGov();
    return { success: true, data };
  }
};
