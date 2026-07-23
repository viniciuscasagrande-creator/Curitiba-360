import { INITIAL_GOVERNMENT_DATA } from "../mocks/governmentMockData";

const STORAGE_KEY = "curitiba360:government-platform";

export const governmentRepository = {
  getData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GOVERNMENT_DATA));
        return INITIAL_GOVERNMENT_DATA;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading government storage:", e);
      return INITIAL_GOVERNMENT_DATA;
    }
  },

  saveData: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving government storage:", e);
    }
  }
};
