import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const auditRef = collection(db, 'auditLogs')

const mockAuditLogs = [
  { id: 'aud-101', user: 'admin@curitiba360.com', action: 'Aprovação de Reembolso', entity: 'Pedido #ORD-10455', ip: '189.23.45.12', timestamp: '2026-07-21T10:15:00' },
  { id: 'aud-102', user: 'finance@curitiba360.com', action: 'Agendamento de Repasse B2B', entity: 'Grand Hotel Rayon', ip: '189.23.45.18', timestamp: '2026-07-21T09:40:00' },
  { id: 'aud-103', user: 'ops@curitiba360.com', action: 'Alteração de Capacidade de Lote', entity: 'Festival Curitiba 360 - Lote VIP', ip: '177.12.88.94', timestamp: '2026-07-20T17:20:00' }
];

export async function getCentralAuditLogs() {
  try {
    const snapshot = await getDocs(auditRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getCentralAuditLogs fallback:', err.message);
  }
  return mockAuditLogs;
}

export async function recordAuditAction(data) {
  try {
    return await addDoc(auditRef, {
      ...data,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore recordAuditAction fallback:', err.message);
    const record = { id: 'aud-' + Date.now(), ...data, timestamp: new Date().toISOString() };
    mockAuditLogs.unshift(record);
    return record;
  }
}
