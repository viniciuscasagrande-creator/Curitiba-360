import { attractionAnalyticsMock } from '../data/attractionAnalyticsMock';

export class AttractionAnalyticsRepository {
  async getAnalytics(attractionId, filterPeriod = '7d', customRange = null) {
    // Simula delay de carregamento assíncrono para UX realista
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Multiplicadores simples de simulação por período
    let multiplier = 1;
    if (filterPeriod === 'today') multiplier = 0.15;
    if (filterPeriod === '30d') multiplier = 4.2;
    if (filterPeriod === 'all') multiplier = 12.5;

    if (multiplier === 1) return attractionAnalyticsMock;

    return {
      ...attractionAnalyticsMock,
      kpis: {
        totalVisits: { ...attractionAnalyticsMock.kpis.totalVisits, value: Math.round(attractionAnalyticsMock.kpis.totalVisits.value * multiplier) },
        totalTickets: { ...attractionAnalyticsMock.kpis.totalTickets, value: Math.round(attractionAnalyticsMock.kpis.totalTickets.value * multiplier) },
        uniqueUsers: { ...attractionAnalyticsMock.kpis.uniqueUsers, value: Math.round(attractionAnalyticsMock.kpis.uniqueUsers.value * multiplier) },
        conversionRate: attractionAnalyticsMock.kpis.conversionRate,
        grossRevenue: Math.round(attractionAnalyticsMock.kpis.grossRevenue * multiplier),
        netRevenue: Math.round(attractionAnalyticsMock.kpis.netRevenue * multiplier),
        averageTicket: attractionAnalyticsMock.kpis.averageTicket,
        adminFees: Math.round(attractionAnalyticsMock.kpis.adminFees * multiplier),
        approvedOrders: Math.round(attractionAnalyticsMock.kpis.approvedOrders * multiplier),
        pendingOrders: Math.round(attractionAnalyticsMock.kpis.pendingOrders * multiplier),
        cancelledOrders: Math.round(attractionAnalyticsMock.kpis.cancelledOrders * multiplier),
        refunds: Math.round(attractionAnalyticsMock.kpis.refunds * multiplier),
        avgStayTime: attractionAnalyticsMock.kpis.avgStayTime
      }
    };
  }
}

export const attractionAnalyticsRepository = new AttractionAnalyticsRepository();
export default attractionAnalyticsRepository;
