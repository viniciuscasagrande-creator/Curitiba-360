import { INITIAL_TOURISM_DATA } from '../data/tourismMockData';

const STORAGE_KEY_TOURISM = 'curitiba360_tourism_v1';

function getStoredTourism() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_TOURISM);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_TOURISM, JSON.stringify(INITIAL_TOURISM_DATA));
      return INITIAL_TOURISM_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de turismo:', error);
    return INITIAL_TOURISM_DATA;
  }
}

export const tourismService = {
  async getTourismOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredTourism();
    return { success: true, data };
  }
};
