import { getSuperAppData, saveSuperAppData } from "../repositories/superAppRepository";

export const protocolService = {
  async getProtocols() {
    const data = await getSuperAppData();
    return { success: true, data: data.protocols };
  },

  async createProtocol(protocolData) {
    const data = await getSuperAppData();
    const newProt = {
      id: "prot-" + Date.now(),
      userId: data.user.id,
      protocolNumber: new Date().getFullYear() + "-" + Math.floor(1000000 + Math.random() * 9000000) + "-CUR",
      currentStep: "Triagem Inicial",
      status: "submitted",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...protocolData
    };
    data.protocols.unshift(newProt);
    data.summary.openProtocols = data.protocols.filter(p => p.status !== "completed").length;
    await saveSuperAppData(data);
    return { success: true, data: newProt };
  }
};
