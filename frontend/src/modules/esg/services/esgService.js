import * as esgRepository from "../repositories/esgRepository";

export const esgService = {
  async getDashboard() {
    try {
      const data = await esgRepository.getEsgDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveProject(project) {
    try {
      const data = await esgRepository.saveEsgProjectRepository(project);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveGoal(goal) {
    try {
      const data = await esgRepository.saveEsgGoalRepository(goal);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveSupplier(supplier) {
    try {
      const data = await esgRepository.saveEsgSupplierRepository(supplier);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
