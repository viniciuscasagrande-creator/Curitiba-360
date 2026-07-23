import { getSuperAppData, saveSuperAppData } from "../repositories/superAppRepository";

export const ticketService = {
  async getTickets() {
    const data = await getSuperAppData();
    return { success: true, data: data.tickets };
  },

  async transferTicket(ticketId, recipientName) {
    const data = await getSuperAppData();
    const ticket = data.tickets.find(t => t.id === ticketId);
    if (!ticket) return { success: false, message: "Ingresso não encontrado." };

    ticket.status = "transferred";
    ticket.transferredToUserId = "recipient-id-mock";
    ticket.updatedAt = new Date().toISOString();

    // Create a copy of the ticket for the recipient
    const newTicket = {
      ...ticket,
      id: "ticket-" + Date.now(),
      participantName: recipientName,
      status: "active",
      transferredToUserId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.tickets.push(newTicket);
    data.summary.activeTickets = data.tickets.filter(t => t.status === "active").length;

    await saveSuperAppData(data);
    return { success: true, ticket, newTicket };
  },

  async rotateQrToken(ticketId) {
    const data = await getSuperAppData();
    const ticket = data.tickets.find(t => t.id === ticketId);
    if (!ticket) return { success: false, message: "Ingresso não encontrado." };

    ticket.qrToken = "ROTATED_" + Math.random().toString(36).substring(7).toUpperCase();
    ticket.qrExpiresAt = new Date(Date.now() + 60000).toISOString(); // expires in 1 min
    await saveSuperAppData(data);
    return { success: true, ticket };
  }
};
