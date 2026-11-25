export async function getPartnerPortalMetrics(partnerId = 'part-1') {
  return {
    partnerName: 'Grand Hotel Rayon & Spa',
    salesTotal: 85400.00,
    ordersCount: 1245,
    conversionRate: '6.8%',
    averageRating: '4.8',
    nextPayoutAmount: 72000.00,
    nextPayoutDate: '2026-08-05',
    recentSales: [
      { orderId: 'ORD-8812', item: 'Pacote Hospedagem 3 Dias', date: '2026-07-21', amount: 1250.00, status: 'pago' },
      { orderId: 'ORD-8815', item: 'Diária Suíte Luxo', date: '2026-07-21', amount: 450.00, status: 'pago' },
      { orderId: 'ORD-8820', item: 'Experiência Spa & Gastronomia', date: '2026-07-20', amount: 320.00, status: 'pago' }
    ]
  };
}
