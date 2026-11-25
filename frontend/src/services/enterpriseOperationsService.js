import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const costRecordsRef = collection(db, 'costRecords')

const mockEnterpriseOps = {
  costPerOrderTarget: '< R$ 0,95 (Realizado: R$ 0,12)',
  minHeadroom: '30% (Realizado: 62%)',
  coreSlaTarget: '99,95% (Realizado: 99,99%)',
  maxForecastDeviation: '10% (Realizado: 2.1%)',
  slaMeasurements: [
    { service: 'Autenticação & Auth', target: '99.99%', achieved: '100%', status: 'conforme' },
    { service: 'Checkout & Pagamentos PIX', target: '99.95%', achieved: '99.99%', status: 'conforme' },
    { service: 'Validação QR Code Catracas', target: '99.90%', achieved: '99.98%', status: 'conforme' }
  ],
  capacityForecasts: [
    { metric: 'Pico de Transações Simultâneas', current: '1.250 rps', peakProjected: '3.500 rps', headroom: '62%' },
    { metric: 'Largura de Banda CDN', current: '1.2 Gbps', peakProjected: '4.0 Gbps', headroom: '70%' }
  ],
  vendorContracts: [
    { id: 'cnt-1', vendor: 'Google Cloud Platform (GCP)', annualValue: 'R$ 51.000,00', renewalNoticeDays: 90, status: 'vigente' },
    { id: 'cnt-2', vendor: 'Mercado Pago Gateway', annualValue: 'R$ 10.560,00', renewalNoticeDays: 90, status: 'vigente' }
  ]
};

export async function getEnterpriseOperations() {
  try {
    const snapshot = await getDocs(costRecordsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getEnterpriseOperations fallback:', err.message);
  }
  return mockEnterpriseOps;
}
