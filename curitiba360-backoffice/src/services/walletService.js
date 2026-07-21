import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

const mockWallet = {
  points: 2450,
  cashbackBalance: 32.50,
  level: 'OURO ⭐',
  benefitsCount: 14,
  transactions: [
    { id: 'tx-1', type: 'credit', amount: 9.00, source: 'Cashback 10% - Ingresso Festival', date: '2026-07-20' },
    { id: 'tx-2', type: 'credit', amount: 15.00, source: 'Pass Experience bônus', date: '2026-07-19' },
    { id: 'tx-3', type: 'credit', amount: 8.50, source: 'Reserva Restaurante Madalosso', date: '2026-07-15' }
  ]
};

export async function getUserWallet(userId) {
  try {
    const snapshot = await getDoc(doc(db, 'wallets', userId));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
  } catch (err) {
    console.warn('Firestore getUserWallet fallback:', err.message);
  }
  return mockWallet;
}
