import * as customerExperienceRepository from "../repositories/customerExperienceRepository";

export const customerExperienceService = {
  async getDashboard() {
    try {
      const data = await customerExperienceRepository.getExperienceDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveCustomer(customer) {
    try {
      const data = await customerExperienceRepository.saveCustomerRepository(customer);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveCampaign(campaign) {
    try {
      const data = await customerExperienceRepository.saveCampaignRepository(campaign);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveCoupon(coupon) {
    try {
      const data = await customerExperienceRepository.saveCouponRepository(coupon);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
