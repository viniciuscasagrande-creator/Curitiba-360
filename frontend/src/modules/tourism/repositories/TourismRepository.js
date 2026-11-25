import { TOURISM_CATEGORIES, INITIAL_ATTRACTIONS } from '../data/tourismMockData';

const RESERVATIONS_KEY = 'curitiba360:tourism_reservations';
const ATTRACTIONS_STORAGE_KEY = 'curitiba360:attractions_list_v1';

function getStoredAttractions() {
  try {
    const data = localStorage.getItem(ATTRACTIONS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(ATTRACTIONS_STORAGE_KEY, JSON.stringify(INITIAL_ATTRACTIONS));
      return INITIAL_ATTRACTIONS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_ATTRACTIONS;
  }
}

function getStoredReservations() {
  try {
    const data = localStorage.getItem(RESERVATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function persistReservations(reservations) {
  try {
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
  } catch (e) {
    console.error('Erro ao salvar reservas:', e);
  }
}

export const TourismRepository = {
  async getCategories() {
    await new Promise((r) => setTimeout(r, 50));
    return TOURISM_CATEGORIES;
  },

  async getAttractions(filters = {}) {
    await new Promise((r) => setTimeout(r, 100));
    let list = getStoredAttractions();

    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter((a) =>
        a.name.toLowerCase().includes(term) ||
        a.categoryName.toLowerCase().includes(term) ||
        (a.address && a.address.neighborhood.toLowerCase().includes(term))
      );
    }

    if (filters.categoryId && filters.categoryId !== 'todas') {
      list = list.filter((a) => a.categoryId === filters.categoryId || a.categoryName.toLowerCase() === filters.categoryId.toLowerCase());
    }

    if (filters.free) {
      list = list.filter((a) => a.free === true);
    }

    if (filters.accessibility) {
      list = list.filter((a) => a.accessibility === true);
    }

    if (filters.reservationRequired) {
      list = list.filter((a) => a.reservationRequired === true);
    }

    if (filters.featured) {
      list = list.filter((a) => a.featured === true);
    }

    return list;
  },

  async getFeaturedAttractions() {
    return this.getAttractions({ featured: true });
  },

  async getAttraction(attractionId) {
    await new Promise((r) => setTimeout(r, 80));
    const list = getStoredAttractions();
    return list.find((a) => a.id === attractionId) || null;
  },

  async getAvailableDates(attractionId) {
    await new Promise((r) => setTimeout(r, 50));
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  },

  async getAvailableTimes(attractionId, date) {
    await new Promise((r) => setTimeout(r, 50));
    return ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];
  },

  async createReservation(input) {
    await new Promise((r) => setTimeout(r, 150));
    const reservations = getStoredReservations();
    const attraction = await this.getAttraction(input.attractionId);

    const price = attraction ? (attraction.priceFrom || 0) : 0;
    const qty = input.participants ? input.participants.length : 1;
    const subtotal = price * qty;
    const fees = subtotal > 0 ? Number((subtotal * 0.1).toFixed(2)) : 0;
    const total = subtotal + fees;

    const voucherCode = `VOUCHER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newReservation = {
      id: `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: input.userId || 'usr-default',
      attractionId: input.attractionId,
      attractionName: attraction ? attraction.name : 'Atrativo Curitiba 360',
      attractionCover: attraction ? attraction.coverImage : '',
      attractionAddress: attraction ? `${attraction.address.street}, ${attraction.address.number}` : 'Curitiba - PR',
      visitDate: input.visitDate,
      visitTime: input.visitTime || '10:00',
      participants: input.participants || [],
      quantity: qty,
      subtotal,
      fees,
      discount: 0,
      total,
      status: 'confirmed', // created, pending, confirmed, cancelled, expired, used, refunded
      voucherCode,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(voucherCode)}`,
      createdAt: new Date().toISOString()
    };

    reservations.unshift(newReservation);
    persistReservations(reservations);
    return newReservation;
  },

  async getUserReservations(userId) {
    await new Promise((r) => setTimeout(r, 100));
    return getStoredReservations();
  },

  async cancelReservation(reservationId) {
    await new Promise((r) => setTimeout(r, 100));
    const reservations = getStoredReservations();
    const index = reservations.findIndex((r) => r.id === reservationId);
    if (index >= 0) {
      reservations[index].status = 'cancelled';
      reservations[index].updatedAt = new Date().toISOString();
      persistReservations(reservations);
    }
  }
};
