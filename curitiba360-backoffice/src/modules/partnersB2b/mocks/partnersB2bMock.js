export const partnersB2bMock = {
  kpis: {
    totalPartners: 342,
    activeContracts: 128,
    monthlyGvM: 1845000,
    averageCommissionPct: 12.5,
    activeBookingsCount: 1420,
    pendingSplitsCount: 15,
    topPartnerName: "Gran Hotel Curitiba",
    satisfactionScore: 4.8
  },

  partners: [
    { id: "p-01", name: "Gran Hotel Curitiba", type: "hotel", category: "Hotéis", status: "active", rating: 4.9, activeBookings: 84 },
    { id: "p-02", name: "Churrascaria Curitibana", type: "restaurant", category: "Restaurantes", status: "active", rating: 4.7, activeBookings: 120 },
    { id: "p-03", name: "Curitiba City Tours", type: "guide", category: "Guias Turísticos", status: "active", rating: 4.8, activeBookings: 45 }
  ],

  contracts: [
    { id: "c-01", partnerName: "Gran Hotel Curitiba", commissionPct: 15, status: "signed", expiryDate: "2027-12-31" },
    { id: "c-02", partnerName: "Churrascaria Curitibana", commissionPct: 10, status: "signed", expiryDate: "2026-10-15" }
  ],

  bookings: [
    { id: "b-101", partnerName: "Gran Hotel Curitiba", customerName: "Maria Santos", date: "2026-07-25", value: 450, status: "confirmed" },
    { id: "b-102", partnerName: "Churrascaria Curitibana", customerName: "João Silva", date: "2026-07-24", value: 180, status: "completed" }
  ]
};
