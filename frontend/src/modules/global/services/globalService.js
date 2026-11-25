import { INITIAL_GLOBAL_DATA } from '../data/globalMockData';

const STORAGE_KEY_GLOBAL = 'curitiba360_global_v1';

function getStoredGlobal() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_GLOBAL);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_GLOBAL, JSON.stringify(INITIAL_GLOBAL_DATA));
      return INITIAL_GLOBAL_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados globais:', error);
    return INITIAL_GLOBAL_DATA;
  }
}

export const globalService = {
  async getGlobalOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredGlobal();
    return { success: true, data };
  }
};
