import { INITIAL_B2B_DATA } from '../data/b2bMockData';

const STORAGE_KEY_B2B = 'curitiba360_b2b_v1';

function getStoredB2b() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_B2B);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_B2B, JSON.stringify(INITIAL_B2B_DATA));
      return INITIAL_B2B_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados do marketplace B2B:', error);
    return INITIAL_B2B_DATA;
  }
}

export const b2bService = {
  async getB2bOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredB2b();
    return { success: true, data };
  }
};
