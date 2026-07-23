import { getSuperAppData, saveSuperAppData } from "../repositories/superAppRepository";

export const identityService = {
  async getProfile() {
    const data = await getSuperAppData();
    return { success: true, data: data.user };
  },

  async updateProfile(profileData) {
    const data = await getSuperAppData();
    data.user = { ...data.user, ...profileData, updatedAt: new Date().toISOString() };
    await saveSuperAppData(data);
    return { success: true, data: data.user };
  },

  async verifyIdentity() {
    const data = await getSuperAppData();
    data.user.identityLevel = "advanced";
    data.user.updatedAt = new Date().toISOString();
    await saveSuperAppData(data);
    return { success: true, data: data.user };
  }
};
