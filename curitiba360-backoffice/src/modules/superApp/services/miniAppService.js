import { getSuperAppData } from "../repositories/superAppRepository";

export const miniAppService = {
  async getMiniApps() {
    const data = await getSuperAppData();
    return { success: true, data: data.miniApps };
  },

  async installMiniApp(id) {
    // Simulated install
    return { success: true, id };
  }
};
