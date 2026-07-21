import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const affiliatesRef = collection(db, 'affiliates')

const mockAffiliates = [
  { id: 'af-101', name: 'Blog Turistando Curitiba', code: 'TURISTANDO', commissionRate: 8, referralsCount: 342, totalEarned: 4104.00, status: 'ativo' },
  { id: 'af-102', name: 'Guia Gastronômico CWB', code: 'GUIAFOOD', commissionRate: 10, referralsCount: 185, totalEarned: 3700.00, status: 'ativo' },
  { id: 'af-103', name: 'Canal Dicas de Viagem', code: 'VIAGEM360', commissionRate: 7, referralsCount: 520, totalEarned: 5460.00, status: 'ativo' }
];

export async function getAffiliates() {
  try {
    const snapshot = await getDocs(affiliatesRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getAffiliates fallback:', err.message);
  }
  return mockAffiliates;
}

export async function createAffiliate(data) {
  try {
    return await addDoc(affiliatesRef, {
      ...data,
      referralsCount: 0,
      totalEarned: 0,
      status: 'ativo',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createAffiliate fallback:', err.message);
    const record = { id: 'af-' + Date.now(), ...data, referralsCount: 0, totalEarned: 0, status: 'ativo' };
    mockAffiliates.unshift(record);
    return record;
  }
}
