import * as partnersB2bRepository from "../repositories/partnersB2bRepository";

export const partnersB2bService = {
  async getDashboard() {
    try {
      const data = await partnersB2bRepository.getPartnersB2bDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateContract(contractId, status) {
    try {
      const data = await partnersB2bRepository.updateContractStatus(contractId, status);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async createBooking(booking) {
    try {
      const data = await partnersB2bRepository.addBooking(booking);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
