import { INITIAL_SMARTVENUE_DATA } from '../data/smartVenueMockData';

const STORAGE_KEY_SMARTVENUE = 'curitiba360_smartvenue_v1';

function getStoredSmartVenue() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SMARTVENUE);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SMARTVENUE, JSON.stringify(INITIAL_SMARTVENUE_DATA));
      return INITIAL_SMARTVENUE_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de Smart Venue:', error);
    return INITIAL_SMARTVENUE_DATA;
  }
}

export const smartVenueService = {
  async getSmartVenueOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredSmartVenue();
    return { success: true, data };
  }
};
