import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../config/firebase'

const refundsRef = collection(db, 'refunds')

const mockRefunds = [
  {
    id: 'ref-501',
    orderId: 'ORD-10455-7739',
    userName: 'Ana Paula',
    amount: 440.00,
    reason: 'Imprevisto de saúde / impossibilidade de comparecer na data.',
    status: 'completed',
    requestedAt: '2026-07-19T09:00:00',
    processedAt: '2026-07-19T14:20:00'
  },
  {
    id: 'ref-502',
    orderId: 'ORD-10452-8821',
    userName: 'Ana Paula',
    amount: 90.00,
    reason: 'Comprei 1 ingresso duplicado por engano.',
    status: 'requested',
    requestedAt: '2026-07-21T08:00:00',
    processedAt: null
  }
];

export async function createRefund(data) {
  try {
    return await addDoc(refundsRef, {
      ...data,
      status: 'requested',
      requestedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createRefund fallback:', err.message);
    const record = { id: 'ref-' + Date.now(), ...data, status: 'requested' };
    mockRefunds.unshift(record);
    return record;
  }
}

export async function getRefunds() {
  try {
    const snapshot = await getDocs(refundsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getRefunds fallback:', err.message);
  }
  return mockRefunds;
}

export async function updateRefundStatus(id, status) {
  try {
    await updateDoc(doc(db, 'refunds', id), {
      status,
      processedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore updateRefundStatus fallback:', err.message);
    const index = mockRefunds.findIndex(r => r.id === id);
    if (index !== -1) {
      mockRefunds[index].status = status;
      mockRefunds[index].processedAt = new Date().toISOString();
    }
  }
}

export const processRefundStatus = updateRefundStatus;
