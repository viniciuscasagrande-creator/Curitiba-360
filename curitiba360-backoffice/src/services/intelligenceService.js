import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const predictionsRef = collection(db, 'predictions')

const mockIntelligence = {
  dataQualityScore: '98.5%',
  completude: '99.1%',
  duplicidade: '0.2%',
  atualizacao: '100%',
  riskCasesCount: 3,
  riskCases: [
    { id: 'risk-101', user: 'usr-8821', score: 92, reason: 'Múltiplos cartões tentados em curto intervalo', action: 'Bloqueio preventivo', status: 'em_analise' },
    { id: 'risk-102', user: 'usr-9942', score: 78, reason: 'Tentativa de compra com IP de alta volatilidade', action: 'Solicitar 2FA', status: 'em_analise' }
  ]
};

export async function getIntelligenceMetrics() {
  try {
    const snapshot = await getDocs(predictionsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getIntelligenceMetrics fallback:', err.message);
  }
  return mockIntelligence;
}
