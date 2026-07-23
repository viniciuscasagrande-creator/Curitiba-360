import * as cmsRepository from "../repositories/cmsRepository";

export const cmsService = {
  async getSummary() {
    try {
      const data = await cmsRepository.getCmsSummary();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getPages() {
    try {
      const data = await cmsRepository.getCmsPages();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getBanners() {
    try {
      const data = await cmsRepository.getCmsBanners();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getRedirects() {
    try {
      const data = await cmsRepository.getCmsRedirects();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getExperiments() {
    try {
      const data = await cmsRepository.getCmsExperiments();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getPersonalizationRules() {
    try {
      const data = await cmsRepository.getPersonalizationRules();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getTranslations() {
    try {
      const data = await cmsRepository.getCmsTranslations();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getCalendarEvents() {
    try {
      const data = await cmsRepository.getCalendarEvents();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async savePage(page) {
    try {
      const data = await cmsRepository.saveCmsPageRepository(page);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveBanner(banner) {
    try {
      const data = await cmsRepository.saveCmsBannerRepository(banner);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveRedirect(red) {
    try {
      const data = await cmsRepository.saveCmsRedirectRepository(red);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveExperiment(exp) {
    try {
      const data = await cmsRepository.saveCmsExperimentRepository(exp);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async savePersonalizationRule(rule) {
    try {
      const data = await cmsRepository.savePersonalizationRuleRepository(rule);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateTranslation(id, translation) {
    try {
      const data = await cmsRepository.updateTranslationRepository(id, translation);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
