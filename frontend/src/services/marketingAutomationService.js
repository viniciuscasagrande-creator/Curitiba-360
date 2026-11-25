import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const campaignsRef = collection(db, 'automationCampaigns')

const mockAutomationCampaigns = [
  { id: 'camp-1', name: 'Boas-Vindas & Cupom 10%', trigger: 'Novo Cadastro', channel: 'Push + Email', sentCount: 12400, conversionRate: '14.2%', status: 'ativa' },
  { id: 'camp-2', name: 'Reativação Clientes Inativos', trigger: 'Inativo 30 dias', channel: 'WhatsApp', sentCount: 3200, conversionRate: '9.8%', status: 'ativa' },
  { id: 'camp-3', name: 'Lembrete de Evento Amanhã', trigger: '24h Antes do Evento', channel: 'Push Notification', sentCount: 8500, conversionRate: '38.5%', status: 'ativa' }
];

export async function getAutomationCampaigns() {
  try {
    const snapshot = await getDocs(campaignsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getAutomationCampaigns fallback:', err.message);
  }
  return mockAutomationCampaigns;
}

export async function createAutomationCampaign(data) {
  try {
    return await addDoc(campaignsRef, {
      ...data,
      sentCount: 0,
      conversionRate: '0%',
      status: 'ativa',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createAutomationCampaign fallback:', err.message);
    const record = { id: 'camp-' + Date.now(), ...data, sentCount: 0, conversionRate: '0%', status: 'ativa' };
    mockAutomationCampaigns.unshift(record);
    return record;
  }
}
