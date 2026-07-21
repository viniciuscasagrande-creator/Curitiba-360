import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../config/firebase'

const ordersRef = collection(db, 'orders')

const mockOrders = [
  {
    id: 'ORD-10452-8821',
    userId: 'u4',
    userName: 'Ana Paula',
    userEmail: 'ana.paula@example.com',
    eventName: 'Festival de Inverno no Jardim Botânico',
    total: 180.00,
    status: 'paid',
    paymentStatus: 'approved',
    paymentMethod: 'Cartão de Crédito',
    createdAt: '2026-07-20T14:30:00'
  },
  {
    id: 'ORD-10453-9912',
    userId: 'u2',
    userName: 'Maria Souza',
    userEmail: 'maria.souza@example.com',
    eventName: 'Noite de Gala na Ópera de Arame',
    total: 600.00,
    status: 'paid',
    paymentStatus: 'approved',
    paymentMethod: 'Pix',
    createdAt: '2026-07-20T16:15:00'
  },
  {
    id: 'ORD-10454-1029',
    userId: 'u3',
    userName: 'Carlos Oliveira',
    userEmail: 'carlos.o@example.com',
    eventName: 'Exposição de Arte Contemporânea MON',
    total: 35.00,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Boleto',
    createdAt: '2026-07-21T08:10:00'
  },
  {
    id: 'ORD-10455-7739',
    userId: 'u4',
    userName: 'Ana Paula',
    userEmail: 'ana.paula@example.com',
    eventName: 'Noite de Gala na Ópera de Arame',
    total: 440.00,
    status: 'refunded',
    paymentStatus: 'refunded',
    paymentMethod: 'Cartão de Crédito',
    createdAt: '2026-07-18T11:00:00'
  }
];

export async function createOrder(data) {
  try {
    return await addDoc(ordersRef, {
      ...data,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createOrder fallback:', err.message);
    const record = { id: 'ORD-' + Date.now(), ...data, status: 'pending', paymentStatus: 'pending' };
    mockOrders.unshift(record);
    return record;
  }
}

export async function getOrders() {
  try {
    const snapshot = await getDocs(ordersRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getOrders fallback:', err.message);
  }
  return mockOrders;
}

export async function getOrderById(id) {
  try {
    const snapshot = await getDoc(doc(db, 'orders', id));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
  } catch (err) {
    console.warn('Firestore getOrderById fallback:', err.message);
  }
  return mockOrders.find(o => o.id === id) || mockOrders[0];
}

export async function getOrdersByUser(userId) {
  try {
    const q = query(ordersRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getOrdersByUser fallback:', err.message);
  }
  return mockOrders.filter(o => o.userId === userId);
}

export async function updateOrderStatus(id, status) {
  try {
    await updateDoc(doc(db, 'orders', id), {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore updateOrderStatus fallback:', err.message);
    const index = mockOrders.findIndex(o => o.id === id);
    if (index !== -1) {
      mockOrders[index].status = status;
    }
  }
}
