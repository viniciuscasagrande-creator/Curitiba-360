import * as extensionsRepository from "../repositories/extensionsRepository";

export const marketplaceService = {
  async getDashboard() {
    try {
      const data = await extensionsRepository.getMarketplaceDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async installExtension(id) {
    try {
      const data = await extensionsRepository.installExtensionRepository(id);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async uninstallExtension(id) {
    try {
      const data = await extensionsRepository.uninstallExtensionRepository(id);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateConfig(id, config) {
    try {
      const data = await extensionsRepository.updateExtensionConfigRepository(id, config);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async publishExtension(ext) {
    try {
      const data = await extensionsRepository.publishExtensionRepository(ext);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
