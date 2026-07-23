import { getSuperAppData } from "../repositories/superAppRepository";

export const cityService = {
  async getServices() {
    const data = await getSuperAppData();
    return { success: true, data: data.cityServices };
  },

  async searchServices(query) {
    const data = await getSuperAppData();
    const filtered = data.cityServices.filter(
      s => s.name.toLowerCase().includes(query.toLowerCase()) || 
           s.desc.toLowerCase().includes(query.toLowerCase())
    );
    return { success: true, data: filtered };
  }
};
