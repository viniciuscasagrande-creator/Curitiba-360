import * as governanceRepository from "../repositories/governanceRepository";

export const decisionIntelligenceService = {
  async getDashboard() {
    try {
      const data = await governanceRepository.getGovernanceDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async createResolution(res) {
    try {
      const data = await governanceRepository.addResolution(res);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateOkr(okrId, progress) {
    try {
      const data = await governanceRepository.updateOkrProgress(okrId, progress);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
