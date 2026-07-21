import { INITIAL_ESG_DATA } from '../data/esgMockData';

const STORAGE_KEY_ESG = 'curitiba360_esg_v1';

function getStoredEsg() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ESG);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_ESG, JSON.stringify(INITIAL_ESG_DATA));
      return INITIAL_ESG_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de ESG:', error);
    return INITIAL_ESG_DATA;
  }
}

export const esgService = {
  async getEsgOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredEsg();
    return { success: true, data };
  }
};
