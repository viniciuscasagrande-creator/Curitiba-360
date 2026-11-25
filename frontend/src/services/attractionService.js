import { collection, getDocs, getDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const attractionsRef = collection(db, 'attractions')

const mockAttractions = [
  {
    id: 'att-1',
    name: 'Jardim Botânico de Curitiba',
    description: 'Estufa de vidro em estilo art nouveau inspirada no Palácio de Cristal de Londres.',
    category: 'Parque / Natureza',
    price: 0.00,
    address: 'R. Eng. Ostoja Roguski, s/n - Jardim Botânico',
    active: true
  },
  {
    id: 'att-2',
    name: 'Ópera de Arame',
    description: 'Teatro com estrutura tubular e teto transparente cercado por um lago e vegetação nativa.',
    category: 'Cultura / Arquitetura',
    price: 15.00,
    address: 'R. João Gava, 970 - Abranches',
    active: true
  },
  {
    id: 'att-3',
    name: 'Museu Oscar Niemeyer (MON)',
    description: 'Conhecido como Museu do Olho, abriga exposições de artes visuais, arquitetura e design.',
    category: 'Museu / Artes',
    price: 30.00,
    address: 'R. Marechal Hermes, 999 - Centro Cívico',
    active: true
  },
  {
    id: 'att-4',
    name: 'Torre Panorâmica',
    description: 'Mirante com vista 360 graus da cidade de Curitiba a 109 metros de altura.',
    category: 'Mirante / Turístico',
    price: 10.00,
    address: 'R. Prof. Lysíaco Pires, 250 - Mercês',
    active: true
  }
];

export async function getAttractions() {
  try {
    const snapshot = await getDocs(attractionsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getAttractions fallback:', err.message);
  }
  return mockAttractions;
}

export async function getAttractionById(id) {
  try {
    const snapshot = await getDoc(doc(db, 'attractions', id));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
  } catch (err) {
    console.warn('Firestore getAttractionById fallback:', err.message);
  }
  return mockAttractions.find(a => a.id === id) || mockAttractions[0];
}

export async function createAttraction(data) {
  try {
    return await addDoc(attractionsRef, {
      ...data,
      active: true,
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createAttraction fallback:', err.message);
    const record = { id: 'att-' + Date.now(), ...data, active: true };
    mockAttractions.unshift(record);
    return record;
  }
}
