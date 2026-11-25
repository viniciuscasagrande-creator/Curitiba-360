import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../config/firebase'

const paymentsRef = collection(db, 'payments')

const mockPayments = [
  {
    id: 'pay-901',
    orderId: 'ORD-10452-8821',
    gateway: 'MercadoPago',
    transactionId: 'TXN-8849201',
    method: 'Cartão de Crédito',
    amount: 180.00,
    status: 'approved',
    createdAt: '2026-07-20T14:31:12'
  },
  {
    id: 'pay-902',
    orderId: 'ORD-10453-9912',
    gateway: 'Pagar.me',
    transactionId: 'TXN-9912048',
    method: 'Pix',
    amount: 600.00,
    status: 'approved',
    createdAt: '2026-07-20T16:15:05'
  },
  {
    id: 'pay-903',
    orderId: 'ORD-10454-1029',
    gateway: 'Stripe',
    transactionId: 'TXN-1029384',
    method: 'Boleto Bancário',
    amount: 35.00,
    status: 'pending',
    createdAt: '2026-07-21T08:10:00'
  },
  {
    id: 'pay-904',
    orderId: 'ORD-10455-7739',
    gateway: 'MercadoPago',
    transactionId: 'TXN-7739201',
    method: 'Cartão de Crédito',
    amount: 440.00,
    status: 'refunded',
    createdAt: '2026-07-18T11:02:00'
  }
];

export async function createPayment(data) {
  try {
    return await addDoc(paymentsRef, {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createPayment fallback:', err.message);
    const record = { id: 'pay-' + Date.now(), ...data, status: 'pending' };
    mockPayments.unshift(record);
    return record;
  }
}

export async function getPayments() {
  try {
    const snapshot = await getDocs(paymentsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getPayments fallback:', err.message);
  }
  return mockPayments;
}

export async function getPaymentByOrder(orderId) {
  try {
    const q = query(paymentsRef, where('orderId', '==', orderId));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getPaymentByOrder fallback:', err.message);
  }
  return mockPayments.filter(p => p.orderId === orderId);
}
