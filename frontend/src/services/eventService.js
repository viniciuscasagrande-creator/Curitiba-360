import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const mockEvents = [
  {
    id: 'ev-1',
    title: 'Festival de Inverno no Jardim Botânico',
    description: 'Apresentações musicais e feira gastronômica nos jardins da estufa.',
    image: '/jardim_botanico.jpg',
    location: 'Jardim Botânico de Curitiba',
    start_date: '2026-07-25T10:00',
    end_date: '2026-07-27T22:00',
    capacity: 1500,
    status: 'publicado',
    created_at: '2026-06-01'
  },
  {
    id: 'ev-2',
    title: 'Noite de Gala na Ópera de Arame',
    description: 'Orquestra Sinfônica de Curitiba tocando clássicos ao vivo.',
    image: '/opera_de_arame.jpg',
    location: 'Ópera de Arame',
    start_date: '2026-08-10T19:30',
    end_date: '2026-08-10T23:00',
    capacity: 800,
    status: 'publicado',
    created_at: '2026-06-15'
  },
  {
    id: 'ev-3',
    title: 'Exposição de Arte Contemporânea MON',
    description: 'Mostra de arte interativa no Museu Oscar Niemeyer.',
    image: '/museu_niemeyer.jpg',
    location: 'Museu Oscar Niemeyer',
    start_date: '2026-09-01T09:00',
    end_date: '2026-09-30T18:00',
    capacity: 2500,
    status: 'rascunho',
    created_at: '2026-07-01'
  }
];

export async function getEvents() {
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getEvents fallback:', err.message);
  }
  return mockEvents;
}

export async function getEventById(id) {
  try {
    const docSnap = await getDoc(doc(db, 'events', id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (err) {
    console.warn('Firestore getEventById fallback:', err.message);
  }
  return mockEvents.find(e => e.id === id) || mockEvents[0];
}

export async function createEvent(eventData) {
  const newId = 'ev-' + Date.now();
  const record = {
    id: newId,
    ...eventData,
    status: eventData.status || 'rascunho',
    created_at: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, 'events', newId), record);
  } catch (err) {
    console.warn('Firestore createEvent fallback:', err.message);
    mockEvents.unshift(record);
  }

  return record;
}

export async function updateEvent(id, updates) {
  try {
    const eventRef = doc(db, 'events', id);
    await updateDoc(eventRef, updates);
  } catch (err) {
    console.warn('Firestore updateEvent fallback:', err.message);
    const index = mockEvents.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEvents[index] = { ...mockEvents[index], ...updates };
    }
  }
}

export async function deleteEvent(id) {
  try {
    await deleteDoc(doc(db, 'events', id));
  } catch (err) {
    console.warn('Firestore deleteEvent fallback:', err.message);
    const index = mockEvents.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEvents.splice(index, 1);
    }
  }
}
