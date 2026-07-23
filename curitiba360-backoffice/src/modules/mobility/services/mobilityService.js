import * as mobilityRepository from "../repositories/mobilityRepository";

export const mobilityService = {
  async getDashboard() {
    try {
      const data = await mobilityRepository.getMobilityDashboard();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveRoute(route) {
    try {
      const data = await mobilityRepository.saveRouteRepository(route);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveTrip(trip) {
    try {
      const data = await mobilityRepository.saveTripRepository(trip);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveDriver(driver) {
    try {
      const data = await mobilityRepository.saveDriverRepository(driver);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
