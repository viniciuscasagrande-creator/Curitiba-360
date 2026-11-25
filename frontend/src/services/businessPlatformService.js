import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const businessUnitsRef = collection(db, 'businessUnits')

const mockBusinessHub = {
  activeCompanies: 1250,
  activePartners: 340,
  monthlyGmv: 'R$ 82.000.000,00',
  recurringRevenue: 'R$ 6.400.000,00',
  activeMarketplaces: 18,
  baasTransactions: 'R$ 14.500.000,00',
  loyaltyUsers: 142000,
  esgScore: '94/100 (Excelente A+)'
};

const mockMarketplaceProducts = [
  { id: 'mp-1', title: 'Cota de Patrocínio Master - Festival 360', category: 'Patrocínio', price: 'R$ 150.000,00', vendor: 'Curitiba 360 Events', status: 'disponivel' },
  { id: 'mp-2', name: 'Estrutura de Som & Iluminação de Grande Porte', category: 'Equipamentos', price: 'R$ 25.000,00/dia', vendor: 'Stage & Sound CWB', status: 'disponivel' },
  { id: 'mp-3', name: 'Seguro de Responsabilidade Civil Eventos', category: 'Seguros', price: 'R$ 3.500,00', vendor: 'Porto Seguro B2B', status: 'disponivel' }
];

const mockBankingAccounts = [
  { accountId: 'baas-881', holder: 'Grand Hotel Rayon & Spa', balance: 'R$ 142.500,00', pixKeys: 3, status: 'ativa' },
  { accountId: 'baas-882', holder: 'Ópera de Arame Produções', balance: 'R$ 380.000,00', pixKeys: 5, status: 'ativa' }
];

export async function getBusinessHubMetrics() {
  try {
    const snapshot = await getDocs(businessUnitsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getBusinessHubMetrics fallback:', err.message);
  }
  return mockBusinessHub;
}

export async function getMarketplaceProducts() {
  return mockMarketplaceProducts;
}

export async function getBankingAccounts() {
  return mockBankingAccounts;
}
