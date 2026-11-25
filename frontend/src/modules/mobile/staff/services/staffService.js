import { INITIAL_STAFF_DATA } from '../data/staffMockData';

const STORAGE_KEY_STAFF_APP = 'curitiba360_staff_mobile_v1';

function getStoredStaff() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_STAFF_APP);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_STAFF_APP, JSON.stringify(INITIAL_STAFF_DATA));
      return INITIAL_STAFF_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados do staff:', error);
    return INITIAL_STAFF_DATA;
  }
}

function persistStaff(data) {
  try {
    localStorage.setItem(STORAGE_KEY_STAFF_APP, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados do staff:', error);
  }
}

export const staffService = {
  async getStaffOverview() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredStaff();
    return { success: true, data };
  },

  async toggleTaskStatus(taskId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredStaff();
    const index = data.tarefas.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error('Tarefa não encontrada.');

    const current = data.tarefas[index].status;
    data.tarefas[index].status = current === 'concluido' ? 'em_andamento' : 'concluido';

    persistStaff(data);
    return { success: true, task: data.tarefas[index] };
  },

  async registerIncident(incidentData) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredStaff();

    const newIncident = {
      id: `INC-${Date.now()}`,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'em_atendimento',
      ...incidentData
    };

    data.ocorrencias.push(newIncident);
    data.kpis.ocorrenciasAbertas += 1;
    persistStaff(data);
    return { success: true, incident: newIncident };
  }
};
