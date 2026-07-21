import { INITIAL_AGENT_DASHBOARD_DATA } from '../data/agentDashboardMockData';

const STORAGE_KEY_AGENT_DASHBOARD = 'curitiba360_agent_dashboard_v1';

function getStoredDashboard() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_AGENT_DASHBOARD);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_AGENT_DASHBOARD, JSON.stringify(INITIAL_AGENT_DASHBOARD_DATA));
      return INITIAL_AGENT_DASHBOARD_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar dados do agente:', error);
    return INITIAL_AGENT_DASHBOARD_DATA;
  }
}

function persistDashboard(data) {
  try {
    localStorage.setItem(STORAGE_KEY_AGENT_DASHBOARD, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados do agente:', error);
  }
}

export const agentDashboardService = {
  async getAgentDashboardData(agentId = 'AGT-2001') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const allData = getStoredDashboard();
    const agentData = allData[agentId] || allData['AGT-2001'];
    return { success: true, data: agentData };
  },

  async updateTaskStatus(agentId = 'AGT-2001', taskId, newStatus) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const allData = getStoredDashboard();
    if (allData[agentId]) {
      allData[agentId].tarefasKanban = allData[agentId].tarefasKanban.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      persistDashboard(allData);
    }
    return { success: true };
  }
};
