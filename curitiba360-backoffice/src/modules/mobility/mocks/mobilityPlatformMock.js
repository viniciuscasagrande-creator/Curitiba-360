export const mobilityPlatformMock = {
  summary: {
    scheduledTrips: 46,
    activeTrips: 12,
    completedTripsToday: 38,
    activeVehicles: 28,
    unavailableVehicles: 4,
    activeDrivers: 31,
    passengersToday: 1840,
    averageOccupancy: 78.4,
    onTimeRate: 92.6,
    averageDelayMinutes: 7,
    kilometersToday: 4280,
    activeIncidents: 3,
    availableParkingSpaces: 426
  },

  trips: [
    { id: "trip-001", routeName: "Aeroporto → Centro", vehicle: "Van 014", driver: "Carlos Henrique", scheduledDepartureAt: "16:30", estimatedArrivalAt: "17:15", passengers: 14, maximumCapacity: 16, status: "in_progress", delayMinutes: 4 },
    { id: "trip-002", routeName: "Centro → Festival Curitiba 360", vehicle: "Ônibus 008", driver: "Mariana Costa", scheduledDepartureAt: "17:00", estimatedArrivalAt: "17:35", passengers: 42, maximumCapacity: 46, status: "boarding", delayMinutes: 0 }
  ],

  alerts: [
    { id: "alert-001", severity: "warning", title: "Viagem com atraso", description: "O transfer Aeroporto → Centro está com atraso estimado de 12 minutos." },
    { id: "alert-002", severity: "high", title: "Documento próximo do vencimento", description: "O seguro do veículo Ônibus 006 vence em cinco dias." }
  ],

  routes: [
    { id: "rt-01", name: "Aeroporto → Centro", description: "Transfer direto do terminal aeroportuário até a Praça Tiradentes.", originStopId: "stp-airport", destinationStopId: "stp-centro", intermediateStopIds: [], transportType: "airport_transfer", estimatedDistanceKm: 18.5, estimatedDurationMinutes: 45, basePrice: 25.0, accessibilityEnabled: true, status: "active" },
    { id: "rt-02", name: "Linha Turismo Circular", description: "Tour pelos principais parques e museus de Curitiba.", originStopId: "stp-centro", destinationStopId: "stp-centro", intermediateStopIds: ["stp-jardim-botanico", "stp-opera-arame"], transportType: "tour_bus", estimatedDistanceKm: 32.0, estimatedDurationMinutes: 120, basePrice: 50.0, accessibilityEnabled: true, status: "active" }
  ],

  stops: [
    { id: "stp-airport", name: "Aeroporto Afonso Pena - Desembarque", type: "airport", address: "Av. Rocha Pombo, S/N - São José dos Pinhais", latitude: -25.5317, longitude: -49.1761, accessible: true, coveredArea: true, waitingArea: true, maximumSimultaneousVehicles: 4, status: "active" },
    { id: "stp-centro", name: "Praça Tiradentes - Central", type: "terminal", address: "Praça Tiradentes, Centro - Curitiba", latitude: -25.4284, longitude: -49.2733, accessible: true, coveredArea: true, waitingArea: true, maximumSimultaneousVehicles: 6, status: "active" }
  ],

  reservations: [
    { id: "res-001", customerId: "cust-908", passengerCount: 2, pickupStopId: "stp-airport", dropoffStopId: "stp-centro", totalAmount: 50.0, status: "confirmed", qrCode: "QR_RES_001_VALID" }
  ],

  fleet: [
    { id: "veh-001", fleetCode: "VAN-014", plate: "BEE4R22", manufacturer: "Mercedes-Benz", model: "Sprinter", year: 2023, type: "van", passengerCapacity: 16, currentOdometerKm: 42000, status: "in_operation" },
    { id: "veh-002", fleetCode: "BUS-008", plate: "CUR360A", manufacturer: "Scania", model: "K310 Double Decker", year: 2024, type: "bus", passengerCapacity: 46, currentOdometerKm: 12000, status: "available" }
  ],

  drivers: [
    { id: "drv-001", name: "Carlos Henrique", document: "029.384.772-10", licenseNumber: "0293847721", licenseCategory: "D", licenseExpiresAt: "2029-12-31", phone: "(41) 98877-2211", status: "driving", averageRating: 4.9 },
    { id: "drv-002", name: "Mariana Costa", document: "084.221.093-98", licenseNumber: "0842210939", licenseCategory: "D", licenseExpiresAt: "2028-06-15", phone: "(41) 99922-3344", status: "available", averageRating: 4.8 }
  ],

  parking: [
    { id: "prk-01", locationId: "loc-jardim", name: "Estacionamento Jardim Botânico", totalSpaces: 120, availableSpaces: 45, accessibleSpaces: 6, busSpaces: 8, reservationEnabled: true, hourlyPrice: 10.0, dailyPrice: 30.0, status: "open" }
  ],

  logisticsOrders: [
    { id: "log-001", description: "Grade de Proteção e Cavaletes", cargoType: "equipment", quantity: 50, weightKg: 800, pickupWindowStart: "08:00", pickupWindowEnd: "10:00", deliveryDeadline: "12:00", priority: "high", status: "scheduled" }
  ],

  incidents: [
    { id: "inc-001", category: "delay", priority: "medium", title: "Trânsito Intenso Linha Verde", description: "Atraso estimado de 15 minutos devido a obras na pista.", status: "open", createdAt: "17:10" }
  ]
};
