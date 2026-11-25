import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../config/firebase'
import { validateTicket } from './ticketValidationService'

const checkinsRef = collection(db, 'checkins')

const mockCheckins = [
  { id: 'chk-1', ticketId: 't-101', ticketCode: 'CTB360-ABCD1234', eventId: 'EVENTO_ATUAL', gateId: 'Portão A', accessPointId: 'PORTAO_A', operatorId: 'op-1', status: 'approved', timestamp: '2026-07-21T09:10:00' },
  { id: 'chk-2', ticketId: 't-102', ticketCode: 'CTB360-OPERA991', eventId: 'EVENTO_ATUAL', gateId: 'Portão B', accessPointId: 'PORTAO_B', operatorId: 'op-1', status: 'approved', timestamp: '2026-07-21T09:15:00' },
  { id: 'chk-3', ticketId: 't-103', ticketCode: 'CTB360-DUP9999', eventId: 'EVENTO_ATUAL', gateId: 'Portão A', accessPointId: 'PORTAO_A', operatorId: 'op-2', status: 'already_used', timestamp: '2026-07-21T09:20:00' }
];

export async function validateTicketCode(code, selectedEventId = 'ev-1', gateId = 'Portão A', operatorId = 'op-admin') {
  const res = await validateTicket({
    code,
    eventId: selectedEventId,
    operatorId,
    accessPointId: gateId,
    deviceId: 'browser'
  });

  return {
    success: res.valid,
    code: res.status,
    title: res.valid ? '✅ ACESSO LIBERADO' : res.status === 'already_used' ? '⚠️ JÁ UTILIZADO' : '❌ ACESSO NEGADO',
    message: res.message,
    ticket: res.ticket,
    color: res.valid ? 'green' : res.status === 'already_used' ? 'yellow' : 'red'
  };
}

export async function createCheckin(data) {
  try {
    return await addDoc(checkinsRef, {
      ...data,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore createCheckin fallback:', err.message);
    const record = { id: 'chk-' + Date.now(), ...data, timestamp: new Date().toISOString() };
    mockCheckins.unshift(record);
    return record;
  }
}

export async function getCheckinsByEvent(eventId) {
  try {
    const q = query(checkinsRef, where('eventId', '==', eventId));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getCheckinsByEvent fallback:', err.message);
  }
  return mockCheckins.filter(c => c.eventId === eventId);
}

export async function getCheckinsByTicket(ticketId) {
  try {
    const q = query(checkinsRef, where('ticketId', '==', ticketId));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getCheckinsByTicket fallback:', err.message);
  }
  return mockCheckins.filter(c => c.ticketId === ticketId);
}

export async function getCheckins() {
  try {
    const snapshot = await getDocs(checkinsRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    }
  } catch (err) {
    console.warn('Firestore getCheckins fallback:', err.message);
  }
  return mockCheckins;
}
