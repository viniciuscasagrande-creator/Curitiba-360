import * as roadmapRepository from "../repositories/roadmapRepository";

export const roadmapService = {
  async getSummary() {
    try {
      const data = await roadmapRepository.getRoadmapSummary();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getObjectives() {
    try {
      const data = await roadmapRepository.getRoadmapObjectives();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getInitiatives() {
    try {
      const data = await roadmapRepository.getRoadmapInitiatives();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getAlerts() {
    try {
      const data = await roadmapRepository.getRoadmapAlerts();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getScenarios() {
    try {
      const data = await roadmapRepository.getRoadmapScenarios();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getInnovationPipeline() {
    try {
      const data = await roadmapRepository.getInnovationPipeline();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getExpansionCities() {
    try {
      const data = await roadmapRepository.getExpansionCities();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async createInitiative(initiative) {
    try {
      const data = await roadmapRepository.createInitiativeRepository(initiative);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateInitiativeStatus(id, status) {
    try {
      const data = await roadmapRepository.updateInitiativeStatusRepository(id, status);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
