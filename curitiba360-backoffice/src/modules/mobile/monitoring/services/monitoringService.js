import { INITIAL_MONITORING_DATA } from '../data/monitoringMockData';

const STORAGE_KEY_MONITORING_APP = 'curitiba360_monitoring_mobile_v1';

function getStoredMonitoring() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_MONITORING_APP);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_MONITORING_APP, JSON.stringify(INITIAL_MONITORING_DATA));
      return INITIAL_MONITORING_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de monitoramento:', error);
    return INITIAL_MONITORING_DATA;
  }
}

function persistMonitoring(data) {
  try {
    localStorage.setItem(STORAGE_KEY_MONITORING_APP, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de monitoramento:', error);
  }
}

export const monitoringService = {
  async getMonitoringOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredMonitoring();
    return { success: true, data };
  },

  async refreshMonitoringData() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredMonitoring();

    data.lastUpdatedTime = new Date().toLocaleTimeString('pt-BR');
    data.kpis.checkinsEfetuados = Math.min(300, data.kpis.checkinsEfetuados + Math.floor(Math.random() * 3));
    data.kpis.publicoPresente = data.kpis.checkinsEfetuados;
    data.kpis.ocupacaoGeralPct = Number(((data.kpis.publicoPresente / data.kpis.capacidadeTotal) * 100).toFixed(1));

    persistMonitoring(data);
    return { success: true, data };
  }
};
