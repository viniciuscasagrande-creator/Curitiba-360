import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

const accessPointsRef = collection(db, 'accessPoints')

const mockAccessPoints = [
  { id: 'ap-1', eventId: 'ev-1', name: 'Portão A - Principal', location: 'Entrada Principal', status: 'ativo' },
  { id: 'ap-2', eventId: 'ev-1', name: 'Portão B - VIP', location: 'Acesso Camarote', status: 'ativo' },
  { id: 'ap-3', eventId: 'ev-1', name: 'Portão C - Lateral', location: 'Estacionamento', status: 'ativo' },
  { id: 'ap-4', eventId: 'ev-1', name: 'Portão D - Serviço / Credenciamento', location: 'Bastidores', status: 'ativo' }
];

export async function getAccessPoints() {
  try {
    const snapshot = await getDocs(accessPointsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getAccessPoints fallback:', err.message);
  }
  return mockAccessPoints;
}

export async function createAccessPoint(data) {
  try {
    return await addDoc(accessPointsRef, {
      ...data,
      status: 'ativo'
    });
  } catch (err) {
    console.warn('Firestore createAccessPoint fallback:', err.message);
    const record = { id: 'ap-' + Date.now(), ...data, status: 'ativo' };
    mockAccessPoints.push(record);
    return record;
  }
}
