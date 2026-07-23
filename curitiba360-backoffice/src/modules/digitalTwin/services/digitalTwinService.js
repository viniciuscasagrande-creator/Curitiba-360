import * as digitalTwinRepository from "../repositories/digitalTwinRepository";

export const digitalTwinService = {
  async getDashboard() {
    try {
      const data = await digitalTwinRepository.getDigitalTwinDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateIoTDevice(deviceId, status) {
    try {
      const data = await digitalTwinRepository.updateIoTDeviceStatus(deviceId, status);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async triggerSimulation(type, parameters) {
    try {
      const data = await digitalTwinRepository.addSimulationScenario(type, parameters);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
