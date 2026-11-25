import { getTicketByCode, updateTicketStatus } from './ticketService'
import { createCheckin } from './checkinService'

export async function validateTicket({
  code,
  eventId,
  operatorId,
  accessPointId,
  deviceId
}) {
  const ticket = await getTicketByCode(code)

  if (!ticket) {
    return {
      valid: false,
      status: 'invalid',
      message: 'Ingresso não encontrado.'
    }
  }

  if (eventId && ticket.eventId && ticket.eventId !== eventId) {
    return {
      valid: false,
      status: 'wrong_event',
      message: 'Este ingresso pertence a outro evento.'
    }
  }

  if (ticket.status === 'cancelled') {
    return {
      valid: false,
      status: 'cancelled',
      message: 'Este ingresso foi cancelado.'
    }
  }

  if (ticket.status === 'used') {
    return {
      valid: false,
      status: 'already_used',
      message: 'Este ingresso já foi utilizado.'
    }
  }

  await updateTicketStatus(ticket.id, 'used')

  await createCheckin({
    ticketId: ticket.id,
    ticketCode: ticket.code,
    eventId: eventId || ticket.eventId || 'EVENTO_ATUAL',
    userId: ticket.userId || 'anon-user',
    operatorId: operatorId || 'op-admin',
    accessPointId: accessPointId || 'PORTAO_A',
    gateId: accessPointId || 'Portão A',
    deviceId: deviceId || 'browser-web',
    status: 'approved'
  })

  return {
    valid: true,
    status: 'approved',
    message: 'Acesso liberado.',
    ticket
  }
}
