import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const agentsRef = collection(db, 'agents')

const mockAgenticMetrics = {
  activeAgentsCount: 18,
  tasksExecutedToday: '42.350',
  automationSuccessRate: '98,6%',
  averageExecutionTime: '4,2 s',
  humanInterventions: 17,
  estimatedSavingsHours: '1.280 h/mês'
};

const mockAgents = [
  { id: 'agent-fin', name: 'Finance Agent', domain: 'Financeiro', role: 'Conciliação & Repasses B2B', status: 'ativo', successRate: '99,4%' },
  { id: 'agent-crm', name: 'CRM Agent', domain: 'Growth & CRM', role: 'Segmentação & Prevenção Churn', status: 'ativo', successRate: '98,9%' },
  { id: 'agent-mkt', name: 'Marketing Agent', domain: 'Marketing', role: 'Criação & Otimização ROAS', status: 'ativo', successRate: '97,8%' },
  { id: 'agent-ops', name: 'Operations Agent', domain: 'Operação Catracas', role: 'Desgargalo de Filas em Tempo Real', status: 'ativo', successRate: '99,8%' },
  { id: 'agent-sup', name: 'Support Agent', domain: 'Atendimento', role: 'Resolução Automática de Tickets', status: 'ativo', successRate: '96,5%' }
];

export async function getAiCommandMetrics() {
  try {
    const snapshot = await getDocs(agentsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getAiCommandMetrics fallback:', err.message);
  }
  return mockAgenticMetrics;
}

export async function getAgentsList() {
  return mockAgents;
}
