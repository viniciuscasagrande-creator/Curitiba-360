import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const predictionsRef = collection(db, 'mlPredictions')

const mockDataPlatform = {
  gmv: 'R$ 2.450.000,00',
  revenue: 'R$ 245.000,00',
  ebitdaMargin: '38,5%',
  ltv: 'R$ 4.250,00',
  cac: 'R$ 18,50',
  nps: '88 (Excelente)',
  churnRate: '1,2%',
  onlineUsers: 4850,
  platformHealth: '100% Excelente 🟢',
  activeEventsCount: 24,
  mlModels: [
    { name: 'Model_Predictive_Churn_v2', accuracy: '94,2%', f1Score: '0.92', status: 'em_producao' },
    { name: 'Model_Dynamic_Pricing_v3', accuracy: '96,8%', f1Score: '0.95', status: 'em_producao' }
  ],
  decisions: [
    { title: 'Otimização de Lote Promo', recommendation: 'Aumentar orçamento da campanha no Meta em R$ 1.500', impact: '+R$ 18.000 GMV' },
    { title: 'Antecipação de Repasses B2B', recommendation: 'Aprovar liquidação antecipada para o Grand Hotel Rayon', impact: 'Fidelização Parceiro' }
  ]
};

export async function getDataPlatformMetrics() {
  try {
    const snapshot = await getDocs(predictionsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getDataPlatformMetrics fallback:', err.message);
  }
  return mockDataPlatform;
}

export async function getControlTowerData() {
  return mockDataPlatform;
}

export async function getTelemetryMetrics() {
  return {
    gatewaysHealth: '100%',
    checkinRate: '120/min',
    activeEmulators: 'Sim'
  };
}

export async function getSemanticLayer() {
  return mockDataPlatform;
}

export async function getAIPredictions() {
  return mockDataPlatform.mlModels;
}
