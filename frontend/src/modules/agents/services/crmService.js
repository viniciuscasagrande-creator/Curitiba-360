import { INITIAL_CRM_CUSTOMERS, INITIAL_OPPORTUNITIES } from '../data/agentCrmMockData';

const STORAGE_KEY_CRM_CUSTOMERS = 'curitiba360_agent_crm_customers_v1';
const STORAGE_KEY_CRM_OPPORTUNITIES = 'curitiba360_agent_crm_opportunities_v1';

function getStoredCustomers() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CRM_CUSTOMERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_CRM_CUSTOMERS, JSON.stringify(INITIAL_CRM_CUSTOMERS));
      return INITIAL_CRM_CUSTOMERS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler clientes CRM:', error);
    return INITIAL_CRM_CUSTOMERS;
  }
}

function getStoredOpportunities() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CRM_OPPORTUNITIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_CRM_OPPORTUNITIES, JSON.stringify(INITIAL_OPPORTUNITIES));
      return INITIAL_OPPORTUNITIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler oportunidades CRM:', error);
    return INITIAL_OPPORTUNITIES;
  }
}

function persistCustomers(data) {
  try {
    localStorage.setItem(STORAGE_KEY_CRM_CUSTOMERS, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar clientes CRM:', error);
  }
}

function persistOpportunities(data) {
  try {
    localStorage.setItem(STORAGE_KEY_CRM_OPPORTUNITIES, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar oportunidades CRM:', error);
  }
}

export const crmService = {
  async listCustomers(agentId = 'AGT-2001', filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let list = getStoredCustomers().filter((c) => c.agentId === agentId || !agentId);

    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter((c) =>
        c.nome.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.cpf.toLowerCase().includes(term) ||
        c.cidade.toLowerCase().includes(term)
      );
    }

    if (filters.segmento && filters.segmento !== 'todos') {
      list = list.filter((c) => c.segmento.toLowerCase() === filters.segmento.toLowerCase());
    }

    return { success: true, data: list, total: list.length };
  },

  async getCustomerById(customerId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const list = getStoredCustomers();
    const customer = list.find((c) => c.id === customerId);
    if (!customer) throw new Error('Cliente não encontrado no CRM.');
    return { success: true, data: customer };
  },

  async addInteraction(customerId, interactionData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = getStoredCustomers();
    const index = list.findIndex((c) => c.id === customerId);
    if (index === -1) throw new Error('Cliente não encontrado.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const newInt = {
      id: `INT-${Math.random().toString().slice(2, 7)}`,
      data: timeStr,
      ...interactionData
    };

    list[index].interacoes = [newInt, ...(list[index].interacoes || [])];
    persistCustomers(list);
    return { success: true, customer: list[index] };
  },

  async listOpportunities(agentId = 'AGT-2001') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const list = getStoredOpportunities().filter((o) => o.agentId === agentId || !agentId);
    return { success: true, data: list };
  },

  async updateOpportunityStage(oppId, newStage) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = getStoredOpportunities();
    const index = list.findIndex((o) => o.id === oppId);
    if (index === -1) throw new Error('Oportunidade não encontrada.');

    list[index].etapa = newStage;
    if (newStage === 'fechado_ganho') list[index].probabilidade = 100;
    if (newStage === 'fechado_perdido') list[index].probabilidade = 0;

    persistOpportunities(list);
    return { success: true, data: list[index] };
  }
};
