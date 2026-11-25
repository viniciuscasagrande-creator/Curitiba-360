import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const enterpriseGoalsRef = collection(db, 'enterpriseGoals')

const mockEnterpriseCommand = {
  strategicGoalsCount: 42,
  collaboratingAgentsCount: 156,
  autonomousProcessesCount: '3.280',
  humanInterventionRate: '2,1%',
  monthlyEstimatedSavings: 'R$ 4.850.000,00'
};

const mockGoals = [
  { id: 'goal-1', title: 'Expandir GMV em 15% no Q3', area: 'Comercial & Marketing', target: 'R$ 95M/mês', status: 'em_progresso', progress: '78%' },
  { id: 'goal-2', title: 'Reduzir MTTR de Incidentes P1 para < 15min', area: 'Engenharia & SRE', target: '12 min', status: 'concluido', progress: '100%' },
  { id: 'goal-3', title: 'Alcançar 100% de Automação em Repasses B2B', area: 'FinTech BaaS', target: '100%', status: 'em_progresso', progress: '92%' }
];

const mockWhatIfSimulations = [
  { id: 'sim-1', scenarioName: 'Aumento de 10% no Lote VIP de Eventos', predictedRevenueImpact: '+R$ 420.000,00', riskLevel: 'Baixo', recommendedAction: 'Executar Reajuste' },
  { id: 'sim-2', scenarioName: 'Abertura de 5 novas catracas biológicas no Estádio', predictedCapacityIncrease: '+3.500 pessoas/hora', riskLevel: 'Mínimo', recommendedAction: 'Aprovar Infra' }
];

export async function getEnterpriseCommandMetrics() {
  try {
    const snapshot = await getDocs(enterpriseGoalsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getEnterpriseCommandMetrics fallback:', err.message);
  }
  return mockEnterpriseCommand;
}

export async function getGoalList() {
  return mockGoals;
}

export async function getWhatIfSimulations() {
  return mockWhatIfSimulations;
}
