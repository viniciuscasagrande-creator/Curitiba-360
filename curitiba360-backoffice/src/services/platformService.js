import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const eventsRef = collection(db, 'platformEvents')

const mockOrganizations = [
  { id: 'org-1', name: 'Curitiba 360 Matriz', plan: 'Enterprise', mrr: 12500.00, usersCount: 142, status: 'ativa' },
  { id: 'org-2', name: 'Prefeitura de Curitiba - Turismo', plan: 'Government', mrr: 25000.00, usersCount: 85, status: 'ativa' },
  { id: 'org-3', name: 'Rede Hotelaria Sul B2B', plan: 'Business', mrr: 8900.00, usersCount: 48, status: 'ativa' }
];

const mockFeatureFlags = [
  { id: 'flag-1', name: 'Pagamento via PIX Parcelado', key: 'pix_installments', enabled: true, rolloutPercent: '100%', environment: 'produção' },
  { id: 'flag-2', name: 'Concierge IA Assistente 2.0', key: 'ai_concierge_v2', enabled: true, rolloutPercent: '50%', environment: 'beta' },
  { id: 'flag-3', name: 'Catraca Biométrica por Leitura Facial', key: 'facial_gate_scan', enabled: false, rolloutPercent: '0%', environment: 'staging' }
];

const mockJobs = [
  { id: 'job-881', name: 'Processamento de Batch Cashback', queue: 'default', status: 'concluido', attempts: 1, duration: '1.4s', updatedAt: '2026-07-21T10:40:00' },
  { id: 'job-882', name: 'Sincronização de Assinaturas Pass', queue: 'billing', status: 'em_execucao', attempts: 1, duration: '0.8s', updatedAt: '2026-07-21T10:42:00' },
  { id: 'job-883', name: 'Envio de Relatórios DRE Executivo', queue: 'reports', status: 'concluido', attempts: 1, duration: '2.1s', updatedAt: '2026-07-21T10:35:00' }
];

const mockDeployments = [
  { id: 'dep-204', version: 'v18.0.0', environment: 'produção', strategy: 'Canary (100%)', status: 'sucesso', deployedAt: '2026-07-21T10:00:00', author: 'CI/CD GitHub Actions' },
  { id: 'dep-203', version: 'v17.4.2', environment: 'staging', strategy: 'Rolling', status: 'sucesso', deployedAt: '2026-07-20T18:30:00', author: 'DevOps Team' }
];

export async function getOrganizations() {
  return mockOrganizations;
}

export async function getFeatureFlags() {
  return mockFeatureFlags;
}

export async function getBackgroundJobs() {
  return mockJobs;
}

export async function getDeployments() {
  return mockDeployments;
}

export async function recordPlatformEvent(data) {
  try {
    return await addDoc(eventsRef, {
      ...data,
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore recordPlatformEvent fallback:', err.message);
  }
}
