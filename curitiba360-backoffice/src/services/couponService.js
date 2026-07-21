import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const couponsRef = collection(db, 'coupons')

const mockCoupons = [
  { id: 'coup-1', code: 'CURITIBA10', type: 'percent', value: 10, usageLimit: 500, usageCount: 240, influencedRevenue: 28800.00, status: 'ativo' },
  { id: 'coup-2', code: 'BENVINDO20', type: 'fixed', value: 20.00, usageLimit: 200, usageCount: 185, influencedRevenue: 16500.00, status: 'ativo' },
  { id: 'coup-3', code: 'PASSVIP', type: 'percent', value: 15, usageLimit: 100, usageCount: 100, influencedRevenue: 19900.00, status: 'esgotado' }
];

export async function getCoupons() {
  try {
    const snapshot = await getDocs(couponsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getCoupons fallback:', err.message);
  }
  return mockCoupons;
}

export async function createCoupon(data) {
  try {
    return await addDoc(couponsRef, {
      ...data,
      usageCount: 0,
      influencedRevenue: 0,
      status: 'ativo',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createCoupon fallback:', err.message);
    const record = { id: 'coup-' + Date.now(), ...data, usageCount: 0, influencedRevenue: 0, status: 'ativo' };
    mockCoupons.unshift(record);
    return record;
  }
}
