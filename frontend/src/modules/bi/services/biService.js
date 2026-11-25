import { INITIAL_BI_DATA } from '../data/biMockData';
import {
  getPipelinesRepository,
  getDataQualityRulesRepository,
  getBusinessMetricsRepository,
  triggerPipelineRunRepository,
  toggleDQRuleRepository
} from '../repositories/biRepository';

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
  },

  async getPipelines() {
    const data = await getPipelinesRepository();
    return { success: true, data };
  },

  async getDataQualityRules() {
    const data = await getDataQualityRulesRepository();
    return { success: true, data };
  },

  async getBusinessMetrics() {
    const data = await getBusinessMetricsRepository();
    return { success: true, data };
  },

  async triggerPipelineRun(id) {
    const data = await triggerPipelineRunRepository(id);
    return { success: true, data };
  },

  async toggleDQRule(id) {
    const data = await toggleDQRuleRepository(id);
    return { success: true, data };
  }
};
