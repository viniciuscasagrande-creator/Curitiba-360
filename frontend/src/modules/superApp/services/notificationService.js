import { getSuperAppData, saveSuperAppData } from "../repositories/superAppRepository";

export const notificationService = {
  async getNotifications() {
    const data = await getSuperAppData();
    return {
      success: true,
      data: data.notifications || [
        { id: "not-001", title: "Pagamento Aprovado", message: "Seu ingresso para o Festival Cultural foi emitido com sucesso.", date: "2026-07-20T14:30:00Z", read: false },
        { id: "not-002", title: "Cashback Creditado", message: "Você recebeu R$ 4,80 de cashback por sua reserva no Madalosso.", date: "2026-07-21T18:05:00Z", read: false },
        { id: "not-003", title: "Alerta de Trânsito", message: "Bloqueio na Av. Manoel Ribas devido a obras do binário.", date: "2026-07-23T08:00:00Z", read: true }
      ]
    };
  },

  async markAllAsRead() {
    const data = await getSuperAppData();
    data.summary.unreadNotifications = 0;
    await saveSuperAppData(data);
    return { success: true };
  }
};
