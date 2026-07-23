import * as legalRepository from "../repositories/legalRepository";

export const legalService = {
  async getDashboard() {
    try {
      const data = await legalRepository.getLegalDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveContract(contract) {
    try {
      const data = await legalRepository.saveContractRepository(contract);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async savePolicy(policy) {
    try {
      const data = await legalRepository.savePolicyRepository(policy);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveConsent(consent) {
    try {
      const data = await legalRepository.saveConsentRepository(consent);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
