import { collection, getDocs, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const mockUsers = [
  { id: 'u1', name: 'João Silva', email: 'joao.silva@example.com', role: 'admin', status: 'ativo', created_at: '2026-01-15' },
  { id: 'u2', name: 'Maria Souza', email: 'maria.souza@example.com', role: 'agencia', status: 'ativo', created_at: '2026-02-10' },
  { id: 'u3', name: 'Carlos Oliveira', email: 'carlos.o@example.com', role: 'parceiro', status: 'inativo', created_at: '2026-03-01' },
  { id: 'u4', name: 'Ana Paula', email: 'ana.paula@example.com', role: 'turista', status: 'ativo', created_at: '2026-04-12' }
];

export async function getUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getUsers fallback:', err.message);
  }
  return mockUsers;
}

export async function getUserById(id) {
  try {
    const docSnap = await getDoc(doc(db, 'users', id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (err) {
    console.warn('Firestore getUserById fallback:', err.message);
  }
  return mockUsers.find(u => u.id === id) || mockUsers[0];
}

export async function createUser(userData) {
  const newId = 'u-' + Date.now();
  const record = {
    id: newId,
    ...userData,
    status: userData.status || 'ativo',
    created_at: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, 'users', newId), record);
  } catch (err) {
    console.warn('Firestore createUser fallback:', err.message);
    mockUsers.unshift(record);
  }

  return record;
}

export async function updateUser(id, updates) {
  try {
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, updates);
  } catch (err) {
    console.warn('Firestore updateUser fallback:', err.message);
    const index = mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...updates };
    }
  }
}
