import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const productsRef = collection(db, 'products')

const mockProducts = [
  { id: 'prod-1', name: 'Kit Souvenir Curitiba 360 (Caneca + Camiseta)', category: 'Produtos', price: 89.90, stock: 150, sold: 42, status: 'disponivel' },
  { id: 'prod-2', name: 'Passeio Guiado Centro Histórico', category: 'Experiências', price: 45.00, stock: 80, sold: 68, status: 'disponivel' },
  { id: 'prod-3', name: 'Almoço Gastronômico Santa Felicidade', category: 'Serviços', price: 110.00, stock: 200, sold: 145, status: 'disponivel' }
];

export async function getProducts() {
  try {
    const snapshot = await getDocs(productsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getProducts fallback:', err.message);
  }
  return mockProducts;
}

export async function addProduct(data) {
  try {
    return await addDoc(productsRef, {
      ...data,
      sold: 0,
      status: 'disponivel',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore addProduct fallback:', err.message);
    const record = { id: 'prod-' + Date.now(), ...data, sold: 0, status: 'disponivel' };
    mockProducts.unshift(record);
    return record;
  }
}
