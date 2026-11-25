import { getSuperAppData, saveSuperAppData } from "../repositories/superAppRepository";

export const emergencyService = {
  async triggerSOS(emergencyType, lat, lng, description) {
    const data = await getSuperAppData();
    const sosRequest = {
      id: "sos-" + Date.now(),
      userId: data.user.id,
      emergencyType,
      latitude: lat || -25.4297,
      longitude: lng || -49.2719,
      description: description || "SOS acionado pelo cidadão através do botão rápido no Super App.",
      status: "created",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (!data.emergencies) {
      data.emergencies = [];
    }
    data.emergencies.unshift(sosRequest);
    await saveSuperAppData(data);
    return { success: true, data: sosRequest };
  }
};
