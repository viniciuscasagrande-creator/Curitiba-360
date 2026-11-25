import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const enterpriseObjectivesRef = collection(db, 'enterpriseObjectives')

const mockBusinessOsMetrics = {
  consolidatedRevenue: 'R$ 128.400.000,00',
  strategicGoalsAchievement: '96%',
  criticalProjectsCount: 14,
  operationalHealth: '99,94%',
  executiveAgentsCount: 24,
  aiSavingsTotal: 'R$ 7.850.000,00'
};

const mockExecutiveBoard = [
  { role: 'CEO Agent', name: 'Chief Executive Officer IA', focus: 'Visão Estratégica & Expansão Global', status: 'ativo', keyRecommendation: 'Aprovar expansão para mercado europeu (Portugal/Espanha).' },
  { role: 'CFO Agent', name: 'Chief Financial Officer IA', focus: 'Governança de Custos, FinOps & BaaS', status: 'ativo', keyRecommendation: 'Otimizar saldo de tesouraria com rendimento diário 100% CDI.' },
  { role: 'COO Agent', name: 'Chief Operating Officer IA', focus: 'Eficiência de Filas & Catracas Biométricas', status: 'ativo', keyRecommendation: 'Redistribuir equipes de apoio nos eventos de grande porte.' },
  { role: 'CTO Agent', name: 'Chief Technology Officer IA', focus: 'Arquitetura Multi-Cloud & DORA Metrics', status: 'ativo', keyRecommendation: 'Manter pipeline GitOps com tempo de deploy em 12 minutos.' },
  { role: 'CMO Agent', name: 'Chief Marketing Officer IA', focus: 'ROAS Omnichannel & Automação WhatsApp', status: 'ativo', keyRecommendation: 'Escalar campanha Meta & TikTok Ads com previsão de ROAS 4.8x.' }
];

const mockBscPerspectives = [
  { name: 'Financeira', kpi: 'EBITDA 38,5%', target: '35%', status: 'superado' },
  { name: 'Clientes & Turistas', kpi: 'NPS 88 (Excelente)', target: '80', status: 'superado' },
  { name: 'Processos Internos', kpi: 'Taxa de Automação IA 98,6%', target: '95%', status: 'superado' },
  { name: 'Aprendizado & Crescimento', kpi: 'Tempo de Build/Deploy 2.2s', target: '< 5s', status: 'superado' }
];

export async function getBusinessOsMetrics() {
  try {
    const snapshot = await getDocs(enterpriseObjectivesRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getBusinessOsMetrics fallback:', err.message);
  }
  return mockBusinessOsMetrics;
}

export async function getExecutiveBoardAgents() {
  return mockExecutiveBoard;
}

export async function getBalancedScorecardData() {
  return mockBscPerspectives;
}
