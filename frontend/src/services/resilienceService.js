import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const incidentsRef = collection(db, 'incidents')

const mockResilience = {
  sloAvailability: '99.99%',
  errorBudgetRemaining: '84%',
  mttr: '6.5 min',
  incidents: [
    { id: 'inc-101', title: 'Pico pontual de latência no gateway de pagamento', priority: 'P3', service: 'Payments Gateway', status: 'resolvido', mtta: '1 min', mttr: '5 min' },
    { id: 'inc-102', title: 'Atualização de cache de ingressos', priority: 'P4', service: 'Firestore Cache', status: 'resolvido', mtta: '2 min', mttr: '8 min' }
  ],
  backups: [
    { id: 'bck-801', name: 'Snapshot Diário Firestore', status: 'sucesso', duration: '12s', timestamp: '2026-07-21T04:00:00' },
    { id: 'bck-802', name: 'Export Cloud Storage Media Assets', status: 'sucesso', duration: '45s', timestamp: '2026-07-21T04:05:00' }
  ]
};

export async function getResilienceMetrics() {
  try {
    const snapshot = await getDocs(incidentsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getResilienceMetrics fallback:', err.message);
  }
  return mockResilience;
}
