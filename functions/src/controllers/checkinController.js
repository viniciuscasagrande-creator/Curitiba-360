import { db } from '../config/firebase.js'
import { FieldValue } from 'firebase-admin/firestore'
import { createAuditLog } from '../utils/audit.js'

export async function checkinTicket(req, res) {
  try {
    const { ticketId, eventId, accessPointId, deviceId } = req.body
    const operatorId = req.user?.uid || 'op-admin'

    if (!ticketId) {
      return res.status(400).json({ error: 'Código do ingresso é obrigatório.' })
    }

    const result = await db.runTransaction(async (transaction) => {
      const ticketRef = db.collection('tickets').doc(ticketId)
      const ticketSnapshot = await transaction.get(ticketRef)

      if (!ticketSnapshot.exists) {
        throw new Error('TICKET_NOT_FOUND')
      }

      const ticket = ticketSnapshot.data()

      if (eventId && ticket.eventId && ticket.eventId !== eventId) {
        throw new Error('WRONG_EVENT')
      }

      if (ticket.status !== 'active') {
        throw new Error('TICKET_ALREADY_USED')
      }

      transaction.update(ticketRef, {
        status: 'used',
        usedAt: FieldValue.serverTimestamp()
      })

      const checkinRef = db.collection('checkins').doc()

      transaction.set(checkinRef, {
        ticketId,
        ticketCode: ticket.code || ticketId,
        eventId: eventId || ticket.eventId || 'EVENTO_ATUAL',
        operatorId,
        accessPointId: accessPointId || 'PORTAO_A',
        deviceId: deviceId || 'browser-web',
        status: 'approved',
        timestamp: FieldValue.serverTimestamp()
      })

      return {
        status: 'approved',
        message: 'Acesso liberado.',
        ticketId
      }
    })

    await createAuditLog({
      action: 'TICKET_CHECKIN',
      userId: req.user?.uid,
      operatorId,
      eventId,
      ticketId,
      accessPointId,
      metadata: { deviceId }
    })

    return res.status(200).json(result)
  } catch (error) {
    const errors = {
      TICKET_NOT_FOUND: 'Ingresso não encontrado',
      WRONG_EVENT: 'Ingresso pertence a outro evento',
      TICKET_ALREADY_USED: 'Ingresso já utilizado'
    }

    return res.status(400).json({
      status: 'denied',
      message: errors[error.message] || 'Acesso negado'
    })
  }
}
