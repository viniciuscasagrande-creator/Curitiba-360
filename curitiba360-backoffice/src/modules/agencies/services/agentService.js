import { INITIAL_AGENTS } from '../data/agentMockData';

const STORAGE_KEY_AGENTS = 'curitiba360_agents_v1';

function getStoredAgents() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_AGENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_AGENTS, JSON.stringify(INITIAL_AGENTS));
      return INITIAL_AGENTS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler agentes do localStorage:', error);
    return INITIAL_AGENTS;
  }
}

function persistAgents(agents) {
  try {
    localStorage.setItem(STORAGE_KEY_AGENTS, JSON.stringify(agents));
  } catch (error) {
    console.error('Erro ao salvar agentes no localStorage:', error);
  }
}

export const agentService = {
  async getAgentsByAgency(agencyId, filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let list = getStoredAgents().filter((a) => a.agencyId === agencyId || !agencyId);

    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter((a) =>
        a.nome.toLowerCase().includes(term) ||
        a.cpf.includes(term) ||
        a.email.toLowerCase().includes(term) ||
        (a.id && a.id.toLowerCase().includes(term)) ||
        (a.cidade && a.cidade.toLowerCase().includes(term))
      );
    }

    if (filters.status && filters.status !== 'todos') {
      list = list.filter((a) => a.status === filters.status);
    }

    const allOfAgency = getStoredAgents().filter((a) => a.agencyId === agencyId || !agencyId);

    return {
      success: true,
      data: list,
      total: list.length,
      counts: {
        todos: allOfAgency.length,
        ativo: allOfAgency.filter((a) => a.status === 'ativo').length,
        inativo: allOfAgency.filter((a) => a.status === 'inativo').length,
        suspenso: allOfAgency.filter((a) => a.status === 'suspenso').length
      }
    };
  },

  async getAgentById(agentId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const list = getStoredAgents();
    const agent = list.find((a) => a.id === agentId);
    if (!agent) throw new Error('Agente não encontrado.');
    return { success: true, data: agent };
  },

  async createAgent(agencyId, agentData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = getStoredAgents();
    const newId = `AGT-${2000 + list.length + 1}`;
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const defaultPermissions = {
      podeVender: true,
      podeCancelar: false,
      podeSolicitarRepasse: true,
      podeVisualizarFinanceiro: false,
      podeEmitirVoucher: false,
      podeValidarIngresso: true,
      podeEditarCliente: true,
      podeGerarCupons: false,
      ...agentData.permissoes
    };

    const newAgent = {
      id: newId,
      agencyId,
      fotoUrl: agentData.fotoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      status: 'ativo',
      dataAdmissao: new Date().toISOString().split('T')[0],
      ultimoAcesso: timeStr,
      vendasMesAtual: 0.0,
      qtdVendasMes: 0,
      saldoDisponivel: 0.0,
      saldoAguardando: 0.0,
      totalSacado: 0.0,
      permissoes: defaultPermissions,
      clientesCRM: [],
      historicoAuditoria: [
        { data: timeStr, acao: 'Agente cadastrado no sistema (Liberado para vendas)', categoria: 'Cadastro' }
      ],
      ...agentData
    };

    list.unshift(newAgent);
    persistAgents(list);
    return { success: true, data: newAgent };
  },

  async updateAgent(agentId, agentData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = getStoredAgents();
    const index = list.findIndex((a) => a.id === agentId);
    if (index === -1) throw new Error('Agente não encontrado para atualização.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const histo = list[index].historicoAuditoria || [];
    histo.push({ data: timeStr, acao: 'Cadastro do agente atualizado', categoria: 'Alterações' });

    list[index] = {
      ...list[index],
      ...agentData,
      id: agentId,
      historicoAuditoria: histo,
      ultimoAcesso: timeStr
    };

    persistAgents(list);
    return { success: true, data: list[index] };
  },

  async deleteAgent(agentId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = getStoredAgents();
    list = list.filter((a) => a.id !== agentId);
    persistAgents(list);
    return { success: true };
  }
};
