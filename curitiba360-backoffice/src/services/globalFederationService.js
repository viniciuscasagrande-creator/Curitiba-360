import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const globalRegionsRef = collection(db, 'globalRegions')

const mockFederationMetrics = {
  activeInstances: 42,
  activeCountries: 12,
  activeRegions: 28,
  connectedClouds: 3,
  globalAvailability: '99,995%',
  averageGlobalLatency: '38 ms',
  crossRegionSyncRate: '99,98%',
  sovereigntyCompliance: '100% LGPD & GDPR'
};

const mockCloudProviders = [
  { id: 'cloud-aws', provider: 'Amazon Web Services (AWS)', region: 'us-east-1 (N. Virginia)', status: 'ativo', clusters: 14, monthlyCost: 'R$ 48.500,00' },
  { id: 'cloud-gcp', provider: 'Google Cloud Platform (GCP)', region: 'southamerica-east1 (São Paulo)', status: 'ativo', clusters: 18, monthlyCost: 'R$ 62.000,00' },
  { id: 'cloud-azure', provider: 'Microsoft Azure', region: 'westeurope (Amsterdam)', status: 'ativo', clusters: 10, monthlyCost: 'R$ 35.200,00' }
];

const mockGlobalRegions = [
  { id: 'reg-br', name: 'Brasil & América do Sul', country: 'Brasil', currency: 'BRL (R$)', compliance: 'LGPD', status: 'ativo' },
  { id: 'reg-eu', name: 'Europa Ocidental', country: 'Portugal / Espanha', currency: 'EUR (€)', compliance: 'GDPR', status: 'ativo' },
  { id: 'reg-na', name: 'América do Norte', country: 'Estados Unidos', currency: 'USD ($)', compliance: 'SOC2 / CCPA', status: 'ativo' }
];

export async function getFederationMetrics() {
  try {
    const snapshot = await getDocs(globalRegionsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getFederationMetrics fallback:', err.message);
  }
  return mockFederationMetrics;
}

export async function getMultiCloudProviders() {
  return mockCloudProviders;
}

export async function getGlobalRegionsList() {
  return mockGlobalRegions;
}
