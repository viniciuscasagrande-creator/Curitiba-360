import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const ticketLotsRef = collection(db, 'ticketLots')

const mockTicketLots = [
  { id: 'lot-1', eventName: 'Festival Curitiba 360', lotName: '1º Lote Promo', price: 60.00, capacity: 500, sold: 500, status: 'esgotado' },
  { id: 'lot-2', eventName: 'Festival Curitiba 360', lotName: '2º Lote Geral', price: 90.00, capacity: 1000, sold: 742, status: 'ativo' },
  { id: 'lot-3', eventName: 'Noite de Gala Ópera de Arame', lotName: 'Lote VIP', price: 220.00, capacity: 200, sold: 185, status: 'ativo' }
];

export async function getTicketLots() {
  try {
    const snapshot = await getDocs(ticketLotsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getTicketLots fallback:', err.message);
  }
  return mockTicketLots;
}

export async function createTicketLot(data) {
  try {
    return await addDoc(ticketLotsRef, {
      ...data,
      sold: 0,
      status: 'ativo',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createTicketLot fallback:', err.message);
    const record = { id: 'lot-' + Date.now(), ...data, sold: 0, status: 'ativo' };
    mockTicketLots.unshift(record);
    return record;
  }
}
