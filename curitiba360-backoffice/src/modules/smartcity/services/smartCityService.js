import * as smartCityRepository from "../repositories/smartCityRepository";

export const smartCityService = {
  async getDashboard() {
    try {
      const data = await smartCityRepository.getSmartCityDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateSensor(sensorId, status) {
    try {
      const data = await smartCityRepository.updateSensorStatus(sensorId, status);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async runSimulation(type, parameters) {
    try {
      const data = await smartCityRepository.runUrbanSimulation(type, parameters);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
