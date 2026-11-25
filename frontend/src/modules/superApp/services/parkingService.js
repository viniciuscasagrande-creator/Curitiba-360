export const parkingService = {
  async getParkingZones() {
    return {
      success: true,
      data: [
        { id: "zone-centro", name: "EstaR Centro - Batel", availableSpots: 14, hourlyRate: 3.0, status: "high_occupancy" },
        { id: "zone-cabral", name: "EstaR Cabral", availableSpots: 42, hourlyRate: 2.0, status: "medium_occupancy" },
        { id: "zone-portao", name: "EstaR Portão", availableSpots: 65, hourlyRate: 2.0, status: "low_occupancy" }
      ]
    };
  },

  async activateEstaR(zoneId, vehiclePlate, durationMinutes) {
    return {
      success: true,
      data: {
        receiptId: "estar-" + Math.random().toString(36).substring(7).toUpperCase(),
        vehiclePlate,
        zoneId,
        durationMinutes,
        expiresAt: new Date(Date.now() + durationMinutes * 60000).toISOString(),
        cost: (durationMinutes / 60) * 3.0
      }
    };
  }
};
