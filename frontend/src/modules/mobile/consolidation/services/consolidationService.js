import { INITIAL_CONSOLIDATION_DATA } from '../data/appConsolidationMockData';

const STORAGE_KEY_CONSOLIDATION_APP = 'curitiba360_consolidation_mobile_v1';

function getStoredConsolidation() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CONSOLIDATION_APP);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_CONSOLIDATION_APP, JSON.stringify(INITIAL_CONSOLIDATION_DATA));
      return INITIAL_CONSOLIDATION_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de consolidação:', error);
    return INITIAL_CONSOLIDATION_DATA;
  }
}

function persistConsolidation(data) {
  try {
    localStorage.setItem(STORAGE_KEY_CONSOLIDATION_APP, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de consolidação:', error);
  }
}

export const consolidationService = {
  async getConsolidationOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredConsolidation();
    return { success: true, data };
  },

  async triggerEasBuild(platform = 'all') {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredConsolidation();

    const newBuild = {
      profile: 'production',
      platform: platform === 'android' ? 'Android (AAB)' : platform === 'ios' ? 'iOS (IPA)' : 'Android & iOS',
      status: 'SUCCESS',
      buildId: `b-eas-${Date.now()}`,
      data: new Date().toLocaleString('pt-BR')
    };

    data.easBuildHistory.unshift(newBuild);
    persistConsolidation(data);

    return { success: true, message: `🚀 Build EAS de produção (${newBuild.platform}) gerado com sucesso!` };
  }
};
