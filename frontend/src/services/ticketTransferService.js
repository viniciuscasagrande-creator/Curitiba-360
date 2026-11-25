import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const transfersRef = collection(db, 'ticketTransfers')

const mockTransfers = []

export async function requestTicketTransfer(data) {
  try {
    return await addDoc(transfersRef, {
      ...data,
      status: 'requested',
      createdAt: serverTimestamp()
    })
  } catch (err) {
    console.warn('Firestore requestTicketTransfer fallback:', err.message)
    const record = { id: 'trf-' + Date.now(), ...data, status: 'requested', createdAt: new Date().toISOString() }
    mockTransfers.unshift(record)
    return record
  }
}
