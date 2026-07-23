const TICKETS_KEY = 'curitiba360:tickets';

function getStoredTickets() {
  try {
    const data = localStorage.getItem(TICKETS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erro ao ler TicketRepository:', e);
    return [];
  }
}

function persistTickets(tickets) {
  try {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  } catch (e) {
    console.error('Erro ao persistir TicketRepository:', e);
  }
}

export const TicketRepository = {
  async generate(order) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const tickets = getStoredTickets();
    const generated = [];

    if (order.items && Array.isArray(order.items)) {
      order.items.forEach((item, itemIdx) => {
        const count = item.quantity || 1;
        const attendees = item.attendees || [];
        for (let i = 0; i < count; i++) {
          const attendee = attendees[i] || {};
          const ticketId = `TCK-${Date.now()}-${itemIdx}-${i}-${Math.floor(Math.random() * 1000)}`;
          const qrCodeData = JSON.stringify({
            ticketId,
            orderId: order.id,
            eventId: item.eventId,
            lotId: item.lotId,
            cpf: attendee.cpf || '000.000.000-00',
            hash: `HASH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
          });

          const ticket = {
            id: ticketId,
            orderId: order.id,
            eventId: item.eventId,
            eventName: item.eventName,
            eventDate: item.eventDate,
            eventVenue: item.eventVenue,
            eventAddress: item.eventAddress || 'Curitiba - PR',
            lotId: item.lotId,
            lotName: item.lotName,
            sector: item.sector || 'Geral',
            gate: item.gate || 'Portão A',
            price: item.price,
            attendeeName: attendee.nome || order.buyerName || 'Portador',
            attendeeCpf: attendee.cpf || 'Não informado',
            attendeeEmail: attendee.email || order.buyerEmail || '',
            qrCodeData,
            status: 'Válido', // Válido, Utilizado, Cancelado, Transferido, Expirado
            createdAt: new Date().toISOString()
          };
          generated.push(ticket);
          tickets.unshift(ticket);
        }
      });
    }

    persistTickets(tickets);
    return generated;
  },

  async find(ticketId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const tickets = getStoredTickets();
    return tickets.find((t) => t.id === ticketId) || null;
  },

  async findByOrder(orderId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const tickets = getStoredTickets();
    return tickets.filter((t) => t.orderId === orderId);
  },

  async validate(ticketId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const tickets = getStoredTickets();
    const index = tickets.findIndex((t) => t.id === ticketId);
    if (index >= 0) {
      if (tickets[index].status === 'Válido') {
        tickets[index].status = 'Utilizado';
        tickets[index].usedAt = new Date().toISOString();
        persistTickets(tickets);
        return { valid: true, ticket: tickets[index], message: 'Ingresso validado com sucesso!' };
      }
      return { valid: false, ticket: tickets[index], message: `Ingresso em status '${tickets[index].status}'.` };
    }
    return { valid: false, message: 'Ingresso não encontrado.' };
  }
};
