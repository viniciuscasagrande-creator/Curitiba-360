import { INITIAL_ENTERPRISE_DATA } from '../data/enterpriseTopologyMockData';

const STORAGE_KEY_ENTERPRISE = 'curitiba360_enterprise_v1';

function getStoredEnterprise() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ENTERPRISE);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_ENTERPRISE, JSON.stringify(INITIAL_ENTERPRISE_DATA));
      return INITIAL_ENTERPRISE_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados da arquitetura enterprise:', error);
    return INITIAL_ENTERPRISE_DATA;
  }
}

function persistEnterprise(data) {
  try {
    localStorage.setItem(STORAGE_KEY_ENTERPRISE, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados da arquitetura enterprise:', error);
  }
}

export const enterpriseService = {
  async getEnterpriseOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredEnterprise();
    return { success: true, data };
  },

  async scaleMicroservice(msId, numInstances) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredEnterprise();

    const ms = data.microservices.find((m) => m.id === msId);
    if (ms) {
      ms.instancias = numInstances;
      persistEnterprise(data);
    }

    return { success: true, message: `🚀 Microsserviço ${ms?.nome} escalado para ${numInstances} instâncias no Cloud Run!` };
  }
};
