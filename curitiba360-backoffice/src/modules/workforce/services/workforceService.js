import * as workforceRepository from "../repositories/workforceRepository";

export const workforceService = {
  async getDashboard() {
    try {
      const data = await workforceRepository.getWorkforceDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveEmployee(employee) {
    try {
      const data = await workforceRepository.saveEmployeeRepository(employee);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveCandidate(candidate) {
    try {
      const data = await workforceRepository.saveCandidateRepository(candidate);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
