import { attractionAnalyticsRepository } from '../repositories/attractionAnalyticsRepository';

export class AttractionAnalyticsService {
  constructor(repository = attractionAnalyticsRepository) {
    this.repository = repository;
  }

  async fetchAnalytics(attractionId, filterPeriod, customRange) {
    return this.repository.getAnalytics(attractionId, filterPeriod, customRange);
  }
}

export const attractionAnalyticsService = new AttractionAnalyticsService();
export default attractionAnalyticsService;
