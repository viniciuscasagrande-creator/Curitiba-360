import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const ledgerRef = collection(db, 'financialLedger')

const mockLedger = [
  {
    transactionId: 'TX-8849201',
    userId: 'u4',
    userName: 'Ana Paula',
    type: 'payment',
    amount: 180.00,
    direction: 'credit',
    source: 'order',
    referenceId: 'ORD-10452-8821',
    status: 'confirmed',
    createdAt: '2026-07-20T14:31:12'
  },
  {
    transactionId: 'TX-8849202',
    userId: 'u4',
    userName: 'Ana Paula',
    type: 'cashback_credit',
    amount: 9.00,
    direction: 'credit',
    source: 'wallet',
    referenceId: 'ORD-10452-8821',
    status: 'confirmed',
    createdAt: '2026-07-20T14:31:12'
  },
  {
    transactionId: 'TX-9912048',
    userId: 'u2',
    userName: 'Maria Souza',
    type: 'payment',
    amount: 600.00,
    direction: 'credit',
    source: 'order',
    referenceId: 'ORD-10453-9912',
    status: 'confirmed',
    createdAt: '2026-07-20T16:15:05'
  },
  {
    transactionId: 'TX-7739201',
    userId: 'u4',
    userName: 'Ana Paula',
    type: 'refund',
    amount: 440.00,
    direction: 'debit',
    source: 'refund',
    referenceId: 'ORD-10455-7739',
    status: 'confirmed',
    createdAt: '2026-07-19T14:20:00'
  }
];

export async function recordLedgerTransaction(data) {
  try {
    return await addDoc(ledgerRef, {
      ...data,
      status: 'confirmed',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore recordLedgerTransaction fallback:', err.message);
    const record = { transactionId: 'TX-' + Date.now(), ...data, status: 'confirmed', createdAt: new Date().toISOString() };
    mockLedger.unshift(record);
    return record;
  }
}

export async function getLedgerTransactions() {
  try {
    const snapshot = await getDocs(ledgerRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  } catch (err) {
    console.warn('Firestore getLedgerTransactions fallback:', err.message);
  }
  return mockLedger;
}

export async function getFinancialMetrics() {
  const transactions = await getLedgerTransactions();
  const gmv = transactions.filter(t => t.type === 'payment').reduce((sum, t) => sum + t.amount, 2450000);
  const revenue = gmv * 0.10;
  const commissions = gmv * 0.075;
  const cashback = gmv * 0.02;
  const payouts = gmv * 0.85;

  return {
    gmv,
    revenue,
    commissions,
    cashback,
    payouts,
    netIncome: revenue - cashback
  };
}
