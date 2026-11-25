import { getSuperAppData, saveSuperAppData } from "../repositories/superAppRepository";

export const reservationService = {
  async getReservations() {
    const data = await getSuperAppData();
    return { success: true, data: data.reservations };
  },

  async createReservation(reservationData) {
    const data = await getSuperAppData();
    const newRes = {
      id: "res-" + Date.now(),
      userId: data.user.id,
      grossAmount: reservationData.grossAmount || 0,
      discountAmount: 0,
      paidAmount: reservationData.grossAmount || 0,
      status: "confirmed",
      voucherCode: "VOUCHER-" + Math.random().toString(36).substring(7).toUpperCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...reservationData
    };
    data.reservations.unshift(newRes);
    data.summary.upcomingReservations = data.reservations.filter(r => r.status === "confirmed").length;
    await saveSuperAppData(data);
    return { success: true, data: newRes };
  },

  async cancelReservation(id) {
    const data = await getSuperAppData();
    const res = data.reservations.find(r => r.id === id);
    if (!res) return { success: false, message: "Reserva não encontrada." };
    res.status = "cancelled";
    res.updatedAt = new Date().toISOString();
    data.summary.upcomingReservations = data.reservations.filter(r => r.status === "confirmed").length;
    await saveSuperAppData(data);
    return { success: true, data: res };
  }
};
