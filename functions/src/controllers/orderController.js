import { db } from '../config/firebase.js'
import { FieldValue } from 'firebase-admin/firestore'
import { createAuditLog } from '../utils/audit.js'

export async function createOrder(req, res) {
  try {
    const { eventId, items } = req.body
    const userId = req.user?.uid || 'user-anon'

    if (!eventId || !items || !items.length) {
      return res.status(400).json({
        error: 'Dados de pedido inválidos. Evento e itens são obrigatórios.'
      })
    }

    const orderRef = db.collection('orders').doc()

    const order = {
      id: orderRef.id,
      userId,
      eventId,
      items,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: FieldValue.serverTimestamp()
    }

    await orderRef.set(order)

    await createAuditLog({
      action: 'CREATE_ORDER',
      userId,
      eventId,
      orderId: orderRef.id,
      metadata: { itemsCount: items.length }
    })

    return res.status(201).json({
      success: true,
      orderId: orderRef.id,
      message: 'Pedido criado com sucesso.'
    })
  } catch (error) {
    console.error('Erro no controller createOrder:', error)
    return res.status(500).json({
      error: 'Erro interno ao processar criação de pedido.'
    })
  }
}
