import { INITIAL_EVENTS_PERFORMANCE_DATA } from '../data/eventsPerformanceMockData';

const STORAGE_KEY_EVENTS_PERF = 'curitiba360_events_performance_v1';

function getStoredPerformance() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_EVENTS_PERF);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_EVENTS_PERF, JSON.stringify(INITIAL_EVENTS_PERFORMANCE_DATA));
      return INITIAL_EVENTS_PERFORMANCE_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler performance consolidada de eventos:', error);
    return INITIAL_EVENTS_PERFORMANCE_DATA;
  }
}

export const eventsPerformanceService = {
  async getPerformance360Overview() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredPerformance();
    return { success: true, data };
  }
};
