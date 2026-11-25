import * as qualityRepository from "../repositories/qualityRepository";

export const qualityService = {
  async getSummary() {
    try {
      const data = await qualityRepository.getQualitySummary();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getReleases() {
    try {
      const data = await qualityRepository.getReleases();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getTestPlans() {
    try {
      const data = await qualityRepository.getTestPlans();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getTestCases() {
    try {
      const data = await qualityRepository.getTestCases();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getBugs() {
    try {
      const data = await qualityRepository.getBugs();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async approveRelease(releaseId, userId = "usr-current") {
    try {
      const data = await qualityRepository.approveReleaseRepository(releaseId, userId);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async createBug(bug) {
    try {
      const data = await qualityRepository.createBugRepository(bug);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateBugStatus(bugId, status) {
    try {
      const data = await qualityRepository.updateBugStatusRepository(bugId, status);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getPerformanceMetrics() {
    try {
      const data = await qualityRepository.getPerformanceMetrics();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getAccessibilityScan() {
    try {
      const data = await qualityRepository.getAccessibilityScan();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getSecurityScan() {
    try {
      const data = await qualityRepository.getSecurityScan();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
