import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'

const issuesRef = collection(db, 'reconciliationIssues')

const mockIssues = [
  { id: 'rec-1', transactionId: 'TX-8849201', type: 'Divergência de Valor', expectedAmount: 180.00, receivedAmount: 180.00, gateway: 'MercadoPago', status: 'conciliado' },
  { id: 'rec-2', transactionId: 'TX-9912048', type: 'Divergência de Tarifa', expectedAmount: 600.00, receivedAmount: 598.50, gateway: 'Pagar.me', status: 'pendente' }
];

export async function getReconciliationIssues() {
  try {
    const snapshot = await getDocs(issuesRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getReconciliationIssues fallback:', err.message);
  }
  return mockIssues;
}

export async function resolveDivergence(id, status = 'conciliado') {
  try {
    await updateDoc(doc(db, 'reconciliationIssues', id), { status });
  } catch (err) {
    console.warn('Firestore resolveDivergence fallback:', err.message);
    const item = mockIssues.find(i => i.id === id);
    if (item) item.status = status;
  }
}
