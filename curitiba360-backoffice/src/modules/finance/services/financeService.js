import * as financeRepository from "../repositories/financeRepository";

export const financeService = {
  async getDashboard() {
    try {
      const data = await financeRepository.getFinanceDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async savePayable(payable) {
    try {
      const data = await financeRepository.savePayableRepository(payable);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveSplitRule(rule) {
    try {
      const data = await financeRepository.saveSplitRuleRepository(rule);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveBudget(budget) {
    try {
      const data = await financeRepository.saveBudgetRepository(budget);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
