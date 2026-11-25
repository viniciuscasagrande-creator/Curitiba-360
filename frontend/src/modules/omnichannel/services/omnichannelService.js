import { INITIAL_OMNICHANNEL_DATA } from '../data/omnichannelMockData';

const STORAGE_KEY_OMNICHANNEL = 'curitiba360_omnichannel_v1';

function getStoredOmnichannel() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_OMNICHANNEL);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_OMNICHANNEL, JSON.stringify(INITIAL_OMNICHANNEL_DATA));
      return INITIAL_OMNICHANNEL_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados omnichannel:', error);
    return INITIAL_OMNICHANNEL_DATA;
  }
}

export const omnichannelService = {
  async getOmnichannelOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredOmnichannel();
    return { success: true, data };
  }
};
