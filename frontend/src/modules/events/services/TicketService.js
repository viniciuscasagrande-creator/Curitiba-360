import { TicketRepository } from '../repositories/TicketRepository';

export const TicketService = {
  async getTicketById(ticketId) {
    const ticket = await TicketRepository.find(ticketId);
    if (!ticket) throw new Error('Ingresso não encontrado.');
    return { success: true, ticket };
  },

  async getTicketsByOrder(orderId) {
    const tickets = await TicketRepository.findByOrder(orderId);
    return { success: true, tickets };
  },

  async validateTicket(ticketId) {
    return TicketRepository.validate(ticketId);
  }
};
