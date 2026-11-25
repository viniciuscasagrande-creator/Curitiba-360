import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const partnersRef = collection(db, 'partners')

const mockPartners = [
  { id: 'part-1', name: 'Grand Hotel Rayon', category: 'Hospedagem', commission: '12%', status: 'ativo', contact: 'contato@rayon.com.br' },
  { id: 'part-2', name: 'Restaurante Madalosso', category: 'Gastronomia', commission: '10%', status: 'ativo', contact: 'reservas@madalosso.com.br' },
  { id: 'part-3', name: 'Serra Verde Express', category: 'Turismo / Passeios', commission: '15%', status: 'ativo', contact: 'vendas@serraverde.com.br' },
  { id: 'part-4', name: 'Bar do Alemão', category: 'Gastronomia / Bar', commission: '10%', status: 'ativo', contact: 'eventos@bardoalemao.com.br' }
];

export async function getPartners() {
  try {
    const snapshot = await getDocs(partnersRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getPartners fallback:', err.message);
  }
  return mockPartners;
}

export async function createPartner(data) {
  try {
    return await addDoc(partnersRef, {
      ...data,
      status: 'ativo',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createPartner fallback:', err.message);
    const record = { id: 'part-' + Date.now(), ...data, status: 'ativo' };
    mockPartners.unshift(record);
    return record;
  }
}
