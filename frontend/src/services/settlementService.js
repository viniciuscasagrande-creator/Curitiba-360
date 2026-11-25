import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const payoutsRef = collection(db, 'payouts')

const mockPayouts = [
  { id: 'po-101', partnerId: 'part-1', partnerName: 'Grand Hotel Rayon', grossAmount: 25450.00, fees: 2545.00, netAmount: 22905.00, status: 'scheduled', payoutDate: '2026-08-05' },
  { id: 'po-102', partnerId: 'part-2', partnerName: 'Restaurante Madalosso', grossAmount: 18900.00, fees: 1890.00, netAmount: 17010.00, status: 'paid', payoutDate: '2026-07-15' },
  { id: 'po-103', partnerId: 'part-3', partnerName: 'Serra Verde Express', grossAmount: 42000.00, fees: 6300.00, netAmount: 35700.00, status: 'scheduled', payoutDate: '2026-08-05' }
];

export async function getPartnerSettlements() {
  try {
    const snapshot = await getDocs(payoutsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  } catch (err) {
    console.warn('Firestore getPartnerSettlements fallback:', err.message);
  }
  return mockPayouts;
}

export async function requestPartnerPayout(data) {
  try {
    return await addDoc(payoutsRef, {
      ...data,
      status: 'scheduled',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore requestPartnerPayout fallback:', err.message);
    const record = { id: 'po-' + Date.now(), ...data, status: 'scheduled' };
    mockPayouts.unshift(record);
    return record;
  }
}
