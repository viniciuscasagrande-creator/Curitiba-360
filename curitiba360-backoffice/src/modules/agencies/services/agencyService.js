import { INITIAL_AGENCIES } from '../data/agencyMockData';

const STORAGE_KEY = 'curitiba360_agencies_v1';

/**
 * Carrega a lista de agências salva no localStorage ou inicializa com os dados mock.
 */
function getStoredAgencies() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_AGENCIES));
      return INITIAL_AGENCIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler agências do localStorage:', error);
    return INITIAL_AGENCIES;
  }
}

/**
 * Salva a lista atualizada no localStorage.
 */
function persistAgencies(agencies) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agencies));
  } catch (error) {
    console.error('Erro ao persistir agências:', error);
  }
}

export const agencyService = {
  /**
   * Busca agências com suporte a filtros e paginação.
   * Simula delay assíncrono para integração transparente com Firestore/REST API.
   */
  async getAgencies(filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    
    let list = getStoredAgencies();

    // Filtro por termo de busca (Razão Social, Nome Fantasia, CNPJ, Email, Cidade ou ID)
    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter((ag) =>
        (ag.nomeFantasia && ag.nomeFantasia.toLowerCase().includes(term)) ||
        (ag.razaoSocial && ag.razaoSocial.toLowerCase().includes(term)) ||
        (ag.cnpj && ag.cnpj.includes(term)) ||
        (ag.email && ag.email.toLowerCase().includes(term)) ||
        (ag.cidade && ag.cidade.toLowerCase().includes(term)) ||
        (ag.id && ag.id.toLowerCase().includes(term))
      );
    }

    // Filtro por Status
    if (filters.status && filters.status !== 'todas') {
      list = list.filter((ag) => ag.status === filters.status);
    }

    // Filtro por Cidade
    if (filters.cidade && filters.cidade !== 'todas') {
      list = list.filter((ag) => ag.cidade === filters.cidade);
    }

    return {
      success: true,
      data: list,
      total: list.length,
      counts: {
        todas: getStoredAgencies().length,
        ativo: getStoredAgencies().filter((a) => a.status === 'ativo').length,
        pendente: getStoredAgencies().filter((a) => a.status === 'pendente').length,
        suspenso: getStoredAgencies().filter((a) => a.status === 'suspenso').length,
        inativo: getStoredAgencies().filter((a) => a.status === 'inativo').length
      }
    };
  },

  /**
   * Busca os detalhes de uma agência específica por ID.
   */
  async getAgencyById(id) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const list = getStoredAgencies();
    const agency = list.find((a) => a.id === id);
    if (!agency) throw new Error('Agência não encontrada.');
    return { success: true, data: agency };
  },

  /**
   * Cria ou atualiza uma agência.
   */
  async saveAgency(agencyData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = getStoredAgencies();

    if (agencyData.id) {
      // Atualização
      const index = list.findIndex((a) => a.id === agencyData.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...agencyData, ultimoAcesso: new Date().toISOString().replace('T', ' ').slice(0, 16) };
      }
    } else {
      // Criação de nova agência
      const newId = `AG-${1000 + list.length + 1}`;
      const newAgency = {
        id: newId,
        status: 'pendente',
        qtdAgentes: 0,
        limiteCredito: agencyData.limiteCredito || 10000.0,
        comissaoPadrao: agencyData.comissaoPadrao || 10.0,
        dataCadastro: new Date().toISOString().split('T')[0],
        ultimoAcesso: new Date().toISOString().replace('T', ' ').slice(0, 16),
        ...agencyData
      };
      list.unshift(newAgency);
    }

    persistAgencies(list);
    return { success: true };
  },

  /**
   * Atualização em massa de status para agências selecionadas.
   */
  async bulkUpdateStatus(ids, newStatus) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = getStoredAgencies();
    list = list.map((ag) => {
      if (ids.includes(ag.id)) {
        return { ...ag, status: newStatus };
      }
      return ag;
    });
    persistAgencies(list);
    return { success: true, updatedCount: ids.length };
  },

  /**
   * Exclusão individual ou em lote de agências.
   */
  async deleteAgencies(ids) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = getStoredAgencies();
    list = list.filter((ag) => !ids.includes(ag.id));
    persistAgencies(list);
    return { success: true, deletedCount: ids.length };
  },

  /**
   * Restaura o mock original (utilitário para testes/reset).
   */
  async resetToMock() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_AGENCIES));
    return { success: true };
  }
};
