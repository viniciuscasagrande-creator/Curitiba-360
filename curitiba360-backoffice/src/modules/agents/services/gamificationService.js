import { INITIAL_GAMIFICATION_DATA } from '../data/gamificationMockData';

const STORAGE_KEY_GAMIFICATION = 'curitiba360_agent_gamification_v1';

function getStoredGamification() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_GAMIFICATION);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_GAMIFICATION, JSON.stringify(INITIAL_GAMIFICATION_DATA));
      return INITIAL_GAMIFICATION_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de gamificação:', error);
    return INITIAL_GAMIFICATION_DATA;
  }
}

function persistGamification(data) {
  try {
    localStorage.setItem(STORAGE_KEY_GAMIFICATION, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar gamificação:', error);
  }
}

export const gamificationService = {
  async getGamificationOverview(agentId = 'AGT-2001') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredGamification();
    return { success: true, data };
  },

  async claimMissionReward(missionId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredGamification();
    const index = data.missoes.findIndex((m) => m.id === missionId);
    if (index === -1) throw new Error('Missão não encontrada.');

    data.missoes[index].status = 'recompensa_resgatada';
    data.agentProfile.xpTotal += data.missoes[index].recompensaXP;

    persistGamification(data);
    return { success: true, data };
  }
};
