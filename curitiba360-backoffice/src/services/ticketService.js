import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../config/firebase'

const ticketsRef = collection(db, 'tickets')

const mockUserTickets = [
  {
    id: 't-101',
    code: 'CTB360-ABCD1234',
    userId: 'user-001',
    eventId: 'ev-1',
    eventName: 'Festival Curitiba 360',
    ticketTypeName: 'Ingresso Inteira - Pista Premium',
    price: 90.00,
    status: 'active',
    createdAt: '2026-07-20'
  },
  {
    id: 't-102',
    code: 'CTB360-OPERA991',
    userId: 'user-001',
    eventId: 'ev-2',
    eventName: 'Noite de Gala na Ópera de Arame',
    ticketTypeName: 'Plateia VIP Frontal',
    price: 150.00,
    status: 'active',
    createdAt: '2026-07-19'
  }
];

export async function getTicketsByUser(userId) {
  try {
    const q = query(ticketsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getTicketsByUser fallback:', err.message);
  }
  return mockUserTickets;
}

export async function getTicketByCode(code) {
  try {
    const q = query(ticketsRef, where('code', '==', code));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const item = snapshot.docs[0];
      return { id: item.id, ...item.data() };
    }
  } catch (err) {
    console.warn('Firestore getTicketByCode fallback:', err.message);
  }
  return mockUserTickets.find(t => t.code === code) || null;
}

export async function getTicketById(id) {
  try {
    const snapshot = await getDoc(doc(db, 'tickets', id));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
  } catch (err) {
    console.warn('Firestore getTicketById fallback:', err.message);
  }
  return mockUserTickets.find(t => t.id === id) || mockUserTickets[0];
}

export async function updateTicketStatus(id, status) {
  try {
    await updateDoc(doc(db, 'tickets', id), {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore updateTicketStatus fallback:', err.message);
    const index = mockUserTickets.findIndex(t => t.id === id);
    if (index !== -1) {
      mockUserTickets[index].status = status;
    }
  }
}
