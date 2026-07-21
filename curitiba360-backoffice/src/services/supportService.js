import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'

const ticketsRef = collection(db, 'supportTickets')

const mockSupportTickets = [
  { id: 'sup-301', customerName: 'Ana Paula', category: 'Pagamento', subject: 'Reenvio de comprovante Pix', sla: '15 min restante', status: 'em_atendimento', createdAt: '2026-07-21T09:10:00' },
  { id: 'sup-302', customerName: 'Carlos Oliveira', category: 'Pass Curitiba 360', subject: 'Dúvida sobre desconto no restaurante', sla: '45 min restante', status: 'aberto', createdAt: '2026-07-21T09:30:00' },
  { id: 'sup-303', customerName: 'João Silva', category: 'Reembolso', subject: 'Confirmação do estorno referente ao pedido #10455', sla: 'Concluído', status: 'resolvido', createdAt: '2026-07-20T16:00:00' }
];

export async function getSupportTickets() {
  try {
    const snapshot = await getDocs(ticketsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getSupportTickets fallback:', err.message);
  }
  return mockSupportTickets;
}

export async function resolveTicket(id, status = 'resolvido') {
  try {
    await updateDoc(doc(db, 'supportTickets', id), { status });
  } catch (err) {
    console.warn('Firestore resolveTicket fallback:', err.message);
    const t = mockSupportTickets.find(item => item.id === id);
    if (t) t.status = status;
  }
}
