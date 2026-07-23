import * as partnerRepository from "../repositories/partnerRepository";

export const portfolioService = {
  async getDashboard() {
    try {
      const data = await partnerRepository.getPartnerDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async createIdea(idea) {
    try {
      const data = await partnerRepository.addIdea(idea);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async createBusinessCase(bc) {
    try {
      const data = await partnerRepository.addBusinessCase(bc);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateProject(projectId, progress) {
    try {
      const data = await partnerRepository.updateProjectProgress(projectId, progress);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
