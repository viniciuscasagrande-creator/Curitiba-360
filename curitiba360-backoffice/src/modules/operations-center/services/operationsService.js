import * as operationsRepository from "../repositories/operationsRepository";

export const operationsService = {
  async getDashboard() {
    try {
      const data = await operationsRepository.getOperationsDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveIncident(incident) {
    try {
      const data = await operationsRepository.saveIncidentRepository(incident);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveContingencyPlan(plan) {
    try {
      const data = await operationsRepository.saveContingencyPlanRepository(plan);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveDevice(device) {
    try {
      const data = await operationsRepository.saveDeviceRepository(device);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
