import { INITIAL_BI_DATA } from '../data/biMockData';

const STORAGE_KEY_BI = 'curitiba360_bi_v1';

function getStoredBi() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_BI);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_BI, JSON.stringify(INITIAL_BI_DATA));
      return INITIAL_BI_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de BI:', error);
    return INITIAL_BI_DATA;
  }
}

export const biService = {
  async getBiOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredBi();
    return { success: true, data };
  }
};
