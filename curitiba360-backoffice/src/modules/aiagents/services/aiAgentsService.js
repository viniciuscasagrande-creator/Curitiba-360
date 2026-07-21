import { INITIAL_AIAGENTS_DATA } from '../data/aiAgentsMockData';

const STORAGE_KEY_AIAGENTS = 'curitiba360_aiagents_v1';

function getStoredAiAgents() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_AIAGENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_AIAGENTS, JSON.stringify(INITIAL_AIAGENTS_DATA));
      return INITIAL_AIAGENTS_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de agentes IA:', error);
    return INITIAL_AIAGENTS_DATA;
  }
}

export const aiAgentsService = {
  async getAiAgentsOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredAiAgents();
    return { success: true, data };
  }
};
