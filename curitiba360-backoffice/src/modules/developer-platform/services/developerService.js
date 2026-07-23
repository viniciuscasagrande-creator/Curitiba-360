import * as developerRepository from "../repositories/developerRepository";

export const developerService = {
  async getSummary() {
    try {
      const data = await developerRepository.getDevSummary();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getApps() {
    try {
      const data = await developerRepository.getDevApps();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getApiKeys() {
    try {
      const data = await developerRepository.getApiKeys();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getWebhooks() {
    try {
      const data = await developerRepository.getWebhooks();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getApiPlans() {
    try {
      const data = await developerRepository.getApiPlans();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getApiLogs() {
    try {
      const data = await developerRepository.getApiLogs();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getMarketplaceItems() {
    try {
      const data = await developerRepository.getMarketplaceItems();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async createDevApp(app) {
    try {
      const data = await developerRepository.createDevAppRepository(app);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateAppStatus(appId, status) {
    try {
      const data = await developerRepository.updateAppStatusRepository(appId, status);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveWebhook(webhook) {
    try {
      const data = await developerRepository.saveWebhookRepository(webhook);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
