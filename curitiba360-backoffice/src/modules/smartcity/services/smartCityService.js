import { INITIAL_SMARTCITY_DATA } from '../data/smartCityMockData';

const STORAGE_KEY_SMARTCITY = 'curitiba360_smartcity_v1';

function getStoredSmartCity() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SMARTCITY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SMARTCITY, JSON.stringify(INITIAL_SMARTCITY_DATA));
      return INITIAL_SMARTCITY_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de Smart City:', error);
    return INITIAL_SMARTCITY_DATA;
  }
}

export const smartCityService = {
  async getSmartCityOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredSmartCity();
    return { success: true, data };
  }
};
