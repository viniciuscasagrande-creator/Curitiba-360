import { db } from '../config/firebase.js'
import { FieldValue } from 'firebase-admin/firestore'

export async function createAuditLog({
  action,
  userId,
  eventId,
  ticketId,
  orderId,
  metadata = {}
}) {
  try {
    await db.collection('auditLogs').add({
      action,
      userId: userId || null,
      eventId: eventId || null,
      ticketId: ticketId || null,
      orderId: orderId || null,
      metadata,
      createdAt: FieldValue.serverTimestamp()
    })
  } catch (err) {
    console.error('Erro ao salvar registro de auditoria:', err)
  }
}
