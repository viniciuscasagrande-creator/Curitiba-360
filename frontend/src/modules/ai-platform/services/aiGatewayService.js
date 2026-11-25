import * as aiPlatformRepository from "../repositories/aiPlatformRepository";

export const aiGatewayService = {
  async getDashboard() {
    try {
      const data = await aiPlatformRepository.getAiDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveAgent(agent) {
    try {
      const data = await aiPlatformRepository.saveAiAgentRepository(agent);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async savePrompt(prompt) {
    try {
      const data = await aiPlatformRepository.savePromptRepository(prompt);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveKnowledgeBase(kb) {
    try {
      const data = await aiPlatformRepository.saveKnowledgeBaseRepository(kb);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveBudget(budget) {
    try {
      const data = await aiPlatformRepository.saveBudgetRepository(budget);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
