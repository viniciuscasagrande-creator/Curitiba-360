import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../config/firebase'

const checkinsRef = collection(db, 'checkins')

const mockCheckins = [
  { id: 'chk-1', ticketId: 'CTB360-ABCD1234', eventId: 'ev-1', gateId: 'Portão A', operatorId: 'op-1', timestamp: '2026-07-21T09:10:00', status: 'liberado' },
  { id: 'chk-2', ticketId: 'CTB360-OPERA991', eventId: 'ev-2', gateId: 'Portão B', operatorId: 'op-1', timestamp: '2026-07-21T09:15:00', status: 'liberado' },
  { id: 'chk-3', ticketId: 'CTB360-DUP9999', eventId: 'ev-1', gateId: 'Portão A', operatorId: 'op-2', timestamp: '2026-07-21T09:20:00', status: 'ja_utilizado' }
];

const mockTicketsDb = {
  'CTB360-ABCD1234': { id: 'CTB360-ABCD1234', eventId: 'ev-1', eventName: 'Festival de Inverno no Jardim Botânico', user: 'Ana Paula', status: 'active', paymentApproved: true },
  'CTB360-OPERA991': { id: 'CTB360-OPERA991', eventId: 'ev-2', eventName: 'Noite de Gala na Ópera de Arame', user: 'Maria Souza', status: 'active', paymentApproved: true },
  'CTB360-USED1111': { id: 'CTB360-USED1111', eventId: 'ev-1', eventName: 'Festival de Inverno no Jardim Botânico', user: 'João Silva', status: 'used', paymentApproved: true },
  'CTB360-CANC2222': { id: 'CTB360-CANC2222', eventId: 'ev-1', eventName: 'Festival de Inverno no Jardim Botânico', user: 'Carlos Oliveira', status: 'cancelled', paymentApproved: true },
  'CTB360-UNPAID33': { id: 'CTB360-UNPAID33', eventId: 'ev-1', eventName: 'Festival de Inverno no Jardim Botânico', user: 'Marcos Souza', status: 'active', paymentApproved: false }
};

export async function validateTicketCode(code, selectedEventId = 'ev-1', gateId = 'Portão A', operatorId = 'op-admin') {
  const normalizedCode = String(code || '').trim().toUpperCase();

  // 1. Ingresso existe?
  const ticket = mockTicketsDb[normalizedCode];
  if (!ticket) {
    return {
      success: false,
      code: 'INVALID_CODE',
      title: '❌ INGRESSO INVÁLIDO',
      message: 'Este código de QR Code não existe no sistema.',
      color: 'red'
    };
  }

  // 2. Pagamento aprovado?
  if (!ticket.paymentApproved) {
    return {
      success: false,
      code: 'UNPAID',
      title: '❌ NÃO AUTORIZADO',
      message: 'O pagamento deste ingresso ainda não foi confirmado.',
      color: 'red'
    };
  }

  // 3. Ingresso cancelado?
  if (ticket.status === 'cancelled') {
    return {
      success: false,
      code: 'CANCELLED',
      title: '❌ INGRESSO CANCELADO',
      message: 'Este ingresso foi cancelado ou reembolsado.',
      color: 'red'
    };
  }

  // 4. Evento correto?
  if (selectedEventId && ticket.eventId !== selectedEventId) {
    return {
      success: false,
      code: 'WRONG_EVENT',
      title: '❌ EVENTO INCORRETO',
      message: `Este ingresso é para "${ticket.eventName}" e não para o evento selecionado.`,
      color: 'red'
    };
  }

  // 5. Ingresso já utilizado?
  if (ticket.status === 'used') {
    return {
      success: false,
      code: 'ALREADY_USED',
      title: '⚠️ JÁ UTILIZADO',
      message: 'Atenção! Este ingresso já foi validado anteriormente na entrada.',
      color: 'yellow'
    };
  }

  // ✅ ACESSO LIBERADO
  ticket.status = 'used';
  const newCheckin = {
    ticketId: normalizedCode,
    eventId: ticket.eventId,
    eventName: ticket.eventName,
    userName: ticket.user,
    gateId: gateId,
    operatorId: operatorId,
    timestamp: new Date().toISOString(),
    status: 'liberado'
  };

  try {
    await addDoc(checkinsRef, {
      ...newCheckin,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore addCheckin fallback:', err.message);
    mockCheckins.unshift({ id: 'chk-' + Date.now(), ...newCheckin });
  }

  return {
    success: true,
    code: 'APPROVED',
    title: '✅ ACESSO LIBERADO',
    message: `Bem-vindo(a), ${ticket.user}! Entrada autorizada em ${gateId}.`,
    ticket: ticket,
    color: 'green'
  };
}

export async function getCheckins() {
  try {
    const snapshot = await getDocs(checkinsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (err) {
    console.warn('Firestore getCheckins fallback:', err.message);
  }
  return mockCheckins;
}
