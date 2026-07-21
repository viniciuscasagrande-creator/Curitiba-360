import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const crmCustomersRef = collection(db, 'userProfiles')

const mockCRMCustomers = [
  {
    userId: 'u1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    level: 'OURO ⭐',
    totalSpent: 4250.00,
    totalOrders: 18,
    eventsAttended: 12,
    cashbackBalance: 32.50,
    pointsBalance: 2450,
    lastPurchase: '2026-07-20',
    timeline: [
      { date: '2026-07-20', event: 'Comprou 2 ingressos para Festival Curitiba 360' },
      { date: '2026-07-19', event: 'Recebeu R$ 15,00 de cashback bônus do Pass' },
      { date: '2026-07-15', event: 'Reserva confirmada no Restaurante Madalosso' },
      { date: '2026-07-10', event: 'Avaliou a atração MON com 5 estrelas' }
    ]
  },
  {
    userId: 'u2',
    name: 'Maria Souza',
    email: 'maria.souza@example.com',
    level: 'DIAMANTE 💎',
    totalSpent: 8900.00,
    totalOrders: 32,
    eventsAttended: 24,
    cashbackBalance: 140.00,
    pointsBalance: 5600,
    lastPurchase: '2026-07-20',
    timeline: [
      { date: '2026-07-20', event: 'Comprou Ingresso Plateia VIP na Ópera de Arame' },
      { date: '2026-07-18', event: 'Assinou o Pass Unlimited' }
    ]
  }
];

export async function getCustomersCRM() {
  try {
    const snapshot = await getDocs(crmCustomersRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getCustomersCRM fallback:', err.message);
  }
  return mockCRMCustomers;
}
