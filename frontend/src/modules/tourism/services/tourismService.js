import { TourismRepository } from '../repositories/TourismRepository';

export class TourismService {
  constructor(repository = TourismRepository) {
    this.repository = repository;
  }

  async getCategories() {
    return this.repository.getCategories();
  }

  async getAttractions(filters = {}) {
    const attractions = await this.repository.getAttractions(filters);
    return attractions
      .filter((item) => item.status === 'active')
      .sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return b.rating - a.rating;
      });
  }

  async getAttraction(attractionId) {
    const attraction = await this.repository.getAttraction(attractionId);
    if (!attraction) {
      throw new Error('Atrativo não encontrado.');
    }
    if (attraction.status !== 'active') {
      throw new Error('Este atrativo não está disponível no momento.');
    }
    return attraction;
  }

  async getAvailableDates(attractionId) {
    return this.repository.getAvailableDates(attractionId);
  }

  async getAvailableTimes(attractionId, date) {
    return this.repository.getAvailableTimes(attractionId, date);
  }
}

export const tourismService = new TourismService(TourismRepository);
