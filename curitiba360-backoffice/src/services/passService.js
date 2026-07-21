import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const passesRef = collection(db, 'passes')

const mockPassPlans = [
  {
    planId: 'plan-explorer',
    name: 'PASS EXPLORER',
    price: 49.90,
    duration: '3 dias',
    benefits: ['3 atrações incluídas', '5% cashback em parceiros', 'Carteira digital unificada'],
    active: true
  },
  {
    planId: 'plan-experience',
    name: 'PASS EXPERIENCE',
    price: 99.90,
    duration: '7 dias',
    benefits: ['8 atrações incluídas', 'Eventos selecionados', '10% cashback', 'Benefícios premium'],
    active: true
  },
  {
    planId: 'plan-unlimited',
    name: 'PASS UNLIMITED',
    price: 199.90,
    duration: '30 dias',
    benefits: ['Acesso ilimitado a atrações participantes', 'Eventos exclusivos VIP', '15% cashback', 'Atendimento prioritário'],
    active: true
  }
];

const mockUserPasses = [
  {
    id: 'pass-778',
    userId: 'user-001',
    planName: 'PASS EXPERIENCE',
    price: 99.90,
    status: 'active',
    validUntil: '2026-08-31',
    experiencesLeft: 8
  }
];

export async function getPassPlans() {
  return mockPassPlans;
}

export async function createPass(data) {
  try {
    return await addDoc(passesRef, {
      ...data,
      status: 'active',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createPass fallback:', err.message);
    const record = { id: 'pass-' + Date.now(), ...data, status: 'active' };
    mockUserPasses.push(record);
    return record;
  }
}

export async function getUserPass(userId) {
  try {
    const q = query(passesRef, where('userId', '==', userId), where('status', '==', 'active'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  } catch (err) {
    console.warn('Firestore getUserPass fallback:', err.message);
  }
  return mockUserPasses.filter(p => p.userId === userId);
}
