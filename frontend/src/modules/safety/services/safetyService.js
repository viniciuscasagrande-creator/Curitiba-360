import * as safetyRepository from "../repositories/safetyRepository";

export const safetyService = {
  async getDashboard() {
    try {
      const data = await safetyRepository.getSafetyDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveIncident(incident) {
    try {
      const data = await safetyRepository.saveIncidentRepository(incident);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveRisk(risk) {
    try {
      const data = await safetyRepository.saveRiskRepository(risk);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
