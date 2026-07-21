import { INITIAL_PRODUCTIVITY_DATA } from '../data/productivityMockData';

const STORAGE_KEY_PRODUCTIVITY = 'curitiba360_agent_productivity_v1';

function getStoredProductivity() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PRODUCTIVITY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_PRODUCTIVITY, JSON.stringify(INITIAL_PRODUCTIVITY_DATA));
      return INITIAL_PRODUCTIVITY_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de produtividade:', error);
    return INITIAL_PRODUCTIVITY_DATA;
  }
}

function persistProductivity(data) {
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTIVITY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de produtividade:', error);
  }
}

export const productivityService = {
  async getProductivityOverview(agentId = 'AGT-2001') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredProductivity();
    return { success: true, data };
  },

  async updateTaskStatus(taskId, newStatus) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredProductivity();
    const index = data.tasks.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error('Tarefa não encontrada.');

    data.tasks[index].status = newStatus;
    if (newStatus === 'concluido') {
      data.tasks[index].slaTempoRestante = 'Concluído com sucesso!';
      data.tasks[index].slaEstourado = false;
    }

    persistProductivity(data);
    return { success: true, task: data.tasks[index] };
  },

  async addAgendaEvent(eventData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredProductivity();
    const newEvt = {
      id: `EVT-${Date.now()}`,
      status: 'agendado',
      ...eventData
    };

    data.agendaEvents.push(newEvt);
    persistProductivity(data);
    return { success: true, event: newEvt };
  }
};
