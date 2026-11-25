import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const incidentsRef = collection(db, 'incidents')

const mockIncidents = [
  { id: 'inc-101', eventName: 'Festival Curitiba 360', category: 'Acesso', priority: 'Média', description: 'Leitor manual do Portão C apresentou lentidão momentânea.', operator: 'Equipe Operacional A', status: 'resolvido', createdAt: '2026-07-21T08:30:00' },
  { id: 'inc-102', eventName: 'Noite de Gala na Ópera de Arame', category: 'Pagamento', priority: 'Baixa', description: 'Dúvida sobre reembolso enviada via aplicativo.', operator: 'Atendimento N2', status: 'em_atendimento', createdAt: '2026-07-21T09:05:00' }
];

export async function getCommandCenterMetrics() {
  return {
    gmv: 2450000.00,
    gmvGrowth: '+18.4%',
    revenue: 245000.00,
    revenueGrowth: '+12.8%',
    users: 128450,
    usersGrowth: '+24%',
    orders: 18450,
    ordersGrowth: '+15%',
    activeOnline: 1245,
    salesLast10Min: 87,
    todayCheckins: 342,
    todaySalesAmount: 18420.00,
    turnstiles: [
      { name: 'Portão A - Principal', status: 'normal', flow: '140 p/min' },
      { name: 'Portão B - VIP', status: 'normal', flow: '85 p/min' },
      { name: 'Portão C - Lateral', status: 'atencao', flow: '65 p/min' },
      { name: 'Portão D - Serviços', status: 'normal', flow: '52 p/min' }
    ]
  };
}

export async function getIncidents() {
  try {
    const snapshot = await getDocs(incidentsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getIncidents fallback:', err.message);
  }
  return mockIncidents;
}

export async function createIncident(data) {
  try {
    return await addDoc(incidentsRef, {
      ...data,
      status: 'em_atendimento',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createIncident fallback:', err.message);
    const record = { id: 'inc-' + Date.now(), ...data, status: 'em_atendimento' };
    mockIncidents.unshift(record);
    return record;
  }
}
