import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const apiKeysRef = collection(db, 'apiKeys')

const mockDeveloperMetrics = {
  activeAppsCount: 12,
  apiCallsToday: '2.430.000',
  averageLatency: '42ms',
  errorRate: '0,03%',
  webhooksSent: '120.342',
  webhookSuccessRate: '99,98%',
  webhookFailures: 24,
  sdkDownloads: 8420
};

const mockDeveloperApps = [
  { id: 'app-1', name: 'Integração Hotelaria Rayon', apiKey: 'c360_live_88a91b...22', scopes: ['orders.read', 'events.read'], status: 'ativo', rateLimit: '1000 req/min' },
  { id: 'app-2', name: 'App Catraca Biomêtrica', apiKey: 'c360_live_99d12x...88', scopes: ['checkins.write', 'tickets.read'], status: 'ativo', rateLimit: '5000 req/min' },
  { id: 'app-3', name: 'ERP Financeiro Totvs Connector', apiKey: 'c360_live_77c44p...11', scopes: ['finance.read', 'payouts.read'], status: 'ativo', rateLimit: '500 req/min' }
];

const mockPlugins = [
  { id: 'plug-1', name: 'WhatsApp Bot Pro 360', category: 'WhatsApp', version: 'v2.1.0', author: 'Curitiba 360 Labs', status: 'instalado', rating: '4.9 ⭐' },
  { id: 'plug-2', name: 'NFe & Cupom Fiscal Automático', category: 'Fiscal', version: 'v1.4.2', author: 'TaxSolutions B2B', status: 'instalado', rating: '4.8 ⭐' },
  { id: 'plug-3', name: 'Looker Studio Real-time Sync', category: 'BI', version: 'v3.0.1', author: 'Data Analytics Co', status: 'disponivel', rating: '5.0 ⭐' }
];

const mockIntegrations = [
  { id: 'int-1', name: 'WhatsApp Business API', provider: 'Meta', status: 'conectado', lastSync: 'Há 2 min' },
  { id: 'int-2', name: 'Google Analytics 4 & Ads', provider: 'Google', status: 'conectado', lastSync: 'Em tempo real' },
  { id: 'int-3', name: 'Stripe Global Payments', provider: 'Stripe', status: 'conectado', lastSync: 'Há 10 min' },
  { id: 'int-4', name: 'Mercado Pago PIX Instantâneo', provider: 'Mercado Pago', status: 'conectado', lastSync: 'Em tempo real' }
];

const mockWorkflows = [
  { id: 'wf-1', name: 'Automação Cashback Pós-Check-in', trigger: 'checkin.completed', steps: ['Pagamento Aprovado', 'Enviar WhatsApp', 'Gerar Cashback R$ 10'], status: 'ativo' },
  { id: 'wf-2', name: 'Alerta de Ingressos Esgotados', trigger: 'ticket.lot_soldout', steps: ['Notificar Gerente', 'Ajustar Preço 2º Lote'], status: 'ativo' }
];

export async function getDeveloperMetrics() {
  try {
    const snapshot = await getDocs(apiKeysRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getDeveloperMetrics fallback:', err.message);
  }
  return mockDeveloperMetrics;
}

export async function getDeveloperApps() {
  return mockDeveloperApps;
}

export async function getPlugins() {
  return mockPlugins;
}

export async function getIntegrations() {
  return mockIntegrations;
}

export async function getWorkflows() {
  return mockWorkflows;
}
