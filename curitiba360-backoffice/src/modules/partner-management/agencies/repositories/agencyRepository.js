import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { firestore } from '../../../../firebase/firebase';
import { agenciesMock } from '../data/agenciesMock';
import { cloneData, generateCode } from '../../shared/utils/partnerFormatters';

let localDatabase = cloneData(agenciesMock);

function wait(ms = 200) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function logAuditAction(agencyId, action, details = {}) {
  try {
    const logsRef = collection(firestore, 'agency_logs');
    await addDoc(logsRef, {
      agencyId,
      action,
      details,
      timestamp: new Date().toISOString(),
      user: 'Gestor Corporativo',
    });
  } catch (err) {
    // Audit log fail silently to keep UX snappy
  }
}

export const agencyRepository = {
  subscribeRealtime(onUpdate) {
    try {
      const colRef = collection(firestore, 'agencies');
      return onSnapshot(colRef, (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          localDatabase = list;
          onUpdate(cloneData(list));
        } else {
          onUpdate(cloneData(localDatabase));
        }
      }, () => {
        onUpdate(cloneData(localDatabase));
      });
    } catch {
      onUpdate(cloneData(localDatabase));
      return () => {};
    }
  },

  async list() {
    try {
      const colRef = collection(firestore, 'agencies');
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        localDatabase = list;
        return cloneData(list);
      }
    } catch {
      // Fallback local memory
    }
    await wait();
    return cloneData(localDatabase);
  },

  async findById(id) {
    try {
      const docRef = doc(firestore, 'agencies', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      }
    } catch {
      // Fallback
    }
    const found = localDatabase.find((a) => a.id === id);
    if (!found) throw new Error('Agência não encontrada.');
    return cloneData(found);
  },

  async create(payload) {
    const now = new Date().toISOString();
    const id = payload.id || generateCode(localDatabase);

    const agency = {
      ...payload,
      id,
      agentsCount: payload.agentsCount ?? 0,
      createdAt: now,
      updatedAt: now,
      status: payload.status ?? 'Pendente de Aprovação',
      statusReason: payload.statusReason ?? '',
      attractions: payload.attractions ?? [],
      managers: payload.managers ?? [],
      documents: payload.documents ?? [],
      bankAccount: payload.bankAccount ?? {},
    };

    try {
      const docRef = doc(firestore, 'agencies', id);
      await setDoc(docRef, agency);
      await logAuditAction(id, 'AGENCY_CREATED', agency);
    } catch (err) {
      // Fallback local memory
    }

    localDatabase = [agency, ...localDatabase];
    return cloneData(agency);
  },

  async update(id, payload) {
    const now = new Date().toISOString();
    const updateData = { ...payload, updatedAt: now };

    try {
      const docRef = doc(firestore, 'agencies', id);
      await updateDoc(docRef, updateData);
      await logAuditAction(id, 'AGENCY_UPDATED', updateData);
    } catch {
      // Fallback local memory
    }

    const index = localDatabase.findIndex((a) => a.id === id);
    if (index >= 0) {
      localDatabase[index] = { ...localDatabase[index], ...updateData };
      return cloneData(localDatabase[index]);
    }
    throw new Error('Agência não encontrada.');
  },

  async updateStatus(id, status, reason = '') {
    return this.update(id, {
      status,
      statusReason: reason,
    });
  },

  async updateMany(ids, payload) {
    const updatedAt = new Date().toISOString();
    const updateData = { ...payload, updatedAt };

    await Promise.all(
      ids.map(async (id) => {
        try {
          const docRef = doc(firestore, 'agencies', id);
          await updateDoc(docRef, updateData);
          await logAuditAction(id, 'AGENCY_STATUS_UPDATED', updateData);
        } catch {
          // Fallback
        }
      })
    );

    localDatabase = localDatabase.map((a) =>
      ids.includes(a.id) ? { ...a, ...updateData } : a
    );

    return cloneData(localDatabase.filter((a) => ids.includes(a.id)));
  },

  async remove(id) {
    try {
      const docRef = doc(firestore, 'agencies', id);
      await deleteDoc(docRef);
      await logAuditAction(id, 'AGENCY_DELETED');
    } catch {
      // Fallback
    }

    localDatabase = localDatabase.filter((a) => a.id !== id);
  },

  async removeMany(ids) {
    await Promise.all(
      ids.map(async (id) => {
        try {
          const docRef = doc(firestore, 'agencies', id);
          await deleteDoc(docRef);
          await logAuditAction(id, 'AGENCY_DELETED');
        } catch {
          // Fallback
        }
      })
    );

    localDatabase = localDatabase.filter((a) => !ids.includes(a.id));
  },
};
