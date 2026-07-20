// src/services/api.js
import { db, auth } from '../config/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit
} from 'firebase/firestore';

// ==========================================
// GESTÃO DE ATRAÇÕES (RF-016 / RF-026)
// ==========================================
export const getAtracoes = async () => {
  const querySnapshot = await getDocs(collection(db, 'atracoes'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAtracaoById = async (id) => {
  const docRef = doc(db, 'atracoes', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  throw new Error('Atração não localizada.');
};

export const addAtracao = async (data) => {
  const docRef = await addDoc(collection(db, 'atracoes'), {
    ...data,
    dataCadastro: new Date().toISOString()
  });
  return docRef.id;
};

export const updateAtracao = async (id, data) => {
  const docRef = doc(db, 'atracoes', id);
  await updateDoc(docRef, data);
};

// ==========================================
// GESTÃO DE USUÁRIOS & PERFIS (RF-013 / RF-035)
// ==========================================
export const getUsuarios = async () => {
  const querySnapshot = await getDocs(collection(db, 'usuarios'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addUsuario = async (data) => {
  const docRef = await addDoc(collection(db, 'usuarios'), {
    ...data,
    dataCadastro: new Date().toISOString()
  });
  return docRef.id;
};

// ==========================================
// OPERAÇÕES FINANCEIRAS & VENDAS (RF-004 / RF-030)
// ==========================================
export const getVendas = async () => {
  const querySnapshot = await getDocs(collection(db, 'vendas'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getVendasPorPeriodo = async (dataInicio, dataFim) => {
  const q = query(
    collection(db, 'vendas'), 
    where('dataCompra', '>=', dataInicio), 
    where('dataCompra', '<=', dataFim),
    orderBy('dataCompra', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ==========================================
// GESTÃO DE CONTRATOS & COMISSÕES (RF-027 / RF-031)
// ==========================================
export const getContratos = async () => {
  const querySnapshot = await getDocs(collection(db, 'contratos'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addContrato = async (data) => {
  const docRef = await addDoc(collection(db, 'contratos'), {
    ...data,
    status: 'Rascunho',
    dataCriacao: new Date().toISOString()
  });
  return docRef.id;
};

// ==========================================
// CONTROLE DE CUPONS & DESCONTOS (RF-018)
// ==========================================
export const getCupons = async () => {
  const querySnapshot = await getDocs(collection(db, 'cupons'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addCupom = async (data) => {
  const docRef = await addDoc(collection(db, 'cupons'), {
    ...data,
    utilizados: 0,
    dataCriacao: new Date().toISOString()
  });
  return docRef.id;
};

// ==========================================
// VALIDAÇÃO & ENTRADA DE PORTARIA (RF-004.04 / RF-017)
// ==========================================
export const validarIngresso = async (codigoIngresso, catracaNome) => {
  const q = query(collection(db, 'ingressos'), where('codigo', '==', codigoIngresso));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return { status: 'ERRO', mensagem: 'Ingresso não localizado no sistema de reservas.' };
  }

  const ingressoDoc = querySnapshot.docs[0];
  const ingressoData = ingressoDoc.data();

  if (ingressoData.status === 'Validado') {
    return { status: 'DUPLICADO', mensagem: `Ingresso já validado em ${ingressoData.dataValidacao}` };
  }

  if (ingressoData.status === 'Cancelado') {
    return { status: 'ERRO', mensagem: 'Ingresso cancelado ou reembolsado.' };
  }

  // Atualizar status para Validado
  const docRef = doc(db, 'ingressos', ingressoDoc.id);
  const timestamp = new Date().toLocaleString('pt-BR');
  await updateDoc(docRef, {
    status: 'Validado',
    dataValidacao: timestamp,
    catracaValidacao: catracaNome
  });

  return { status: 'SUCESSO', dados: { ...ingressoData, id: ingressoDoc.id, status: 'Validado', dataValidacao: timestamp } };
};
