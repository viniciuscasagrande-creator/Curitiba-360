import { INITIAL_PIPELINE_OPPORTUNITIES } from '../data/pipelineMockData';

const STORAGE_KEY_PIPELINE = 'curitiba360_agent_pipeline_v1';

function getStoredPipeline() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PIPELINE);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_PIPELINE, JSON.stringify(INITIAL_PIPELINE_OPPORTUNITIES));
      return INITIAL_PIPELINE_OPPORTUNITIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler pipeline:', error);
    return INITIAL_PIPELINE_OPPORTUNITIES;
  }
}

function persistPipeline(data) {
  try {
    localStorage.setItem(STORAGE_KEY_PIPELINE, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar pipeline:', error);
  }
}

export const pipelineService = {
  async getPipelineOverview(agentId = 'AGT-2001', filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let list = getStoredPipeline().filter((o) => o.agentId === agentId || !agentId);

    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter((o) =>
        o.id.toLowerCase().includes(term) ||
        o.titulo.toLowerCase().includes(term) ||
        o.clienteNome.toLowerCase().includes(term) ||
        o.origem.toLowerCase().includes(term)
      );
    }

    if (filters.prioridade && filters.prioridade !== 'todas') {
      list = list.filter((o) => o.prioridade === filters.prioridade);
    }

    const valorTotalPipeline = list.reduce((acc, o) => acc + (o.valorEstimado || 0), 0);
    const receitaPonderada = list.reduce((acc, o) => acc + ((o.valorEstimado || 0) * ((o.probabilidade || 50) / 100)), 0);
    const ganhas = list.filter((o) => o.etapa === 'fechado_ganho').length;
    const taxaConversao = list.length > 0 ? Math.round((ganhas / list.length) * 100) : 75;

    return {
      success: true,
      data: list,
      metrics: {
        valorTotalPipeline,
        receitaPonderada,
        taxaConversao,
        totalOportunidades: list.length,
        ganhas
      }
    };
  },

  async getOpportunityById(oppId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const list = getStoredPipeline();
    const opp = list.find((o) => o.id === oppId);
    if (!opp) throw new Error('Oportunidade não encontrada.');
    return { success: true, data: opp };
  },

  async updateOpportunityStage(oppId, newStage) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let list = getStoredPipeline();
    const index = list.findIndex((o) => o.id === oppId);
    if (index === -1) throw new Error('Oportunidade não encontrada.');

    list[index].etapa = newStage;
    if (newStage === 'fechado_ganho') list[index].probabilidade = 100;
    if (newStage === 'fechado_perdido') list[index].probabilidade = 0;

    persistPipeline(list);
    return { success: true, data: list[index] };
  },

  async addActivity(oppId, activityData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = getStoredPipeline();
    const index = list.findIndex((o) => o.id === oppId);
    if (index === -1) throw new Error('Oportunidade não encontrada.');

    const newAct = {
      id: `ACT-${Math.floor(Math.random() * 1000 + 100)}`,
      concluido: false,
      ...activityData
    };

    list[index].atividades = [newAct, ...(list[index].atividades || [])];
    persistPipeline(list);
    return { success: true, opportunity: list[index] };
  }
};
