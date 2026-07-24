import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

import {
  firestore,
} from '../../../../firebase/firestore';

import {
  FIREBASE_COLLECTIONS,
} from '../../../../firebase/firebaseCollections';

import {
  mapFirebaseError,
} from '../../../../firebase/firebaseErrorMapper';

import {
  normalizeBatchMetadata,
  splitIntoChunks,
  validateAgencyIds,
  createBatchResult,
} from '../utils/agencyBatchUtils';

import {
  removeUndefinedValues,
} from '../utils/firestoreDataMapper';

const AGENCIES_COLLECTION =
  FIREBASE_COLLECTIONS.AGENCIES;

const LOGS_COLLECTION =
  FIREBASE_COLLECTIONS.AGENCY_LOGS ||
  FIREBASE_COLLECTIONS.LOGS ||
  'agency_logs';

const SAFE_BATCH_SIZE = 400;

function getAgencyDocument(id) {
  return doc(
    firestore,
    AGENCIES_COLLECTION,
    id,
  );
}

function getLogsCollection() {
  return collection(
    firestore,
    LOGS_COLLECTION,
  );
}

function createLogDocumentReference() {
  return doc(getLogsCollection());
}

function buildAgencyLog({
  agencyId,
  action,
  previousStatus = null,
  newStatus = null,
  changes = null,
  metadata = {},
}) {
  const normalizedMetadata =
    normalizeBatchMetadata(metadata);

  return removeUndefinedValues({
    agencyId,
    entityType: 'agency',
    action,

    previousStatus,
    newStatus,
    changes,

    reason:
      normalizedMetadata.reason || null,

    actor: {
      id: normalizedMetadata.actorId,
      name: normalizedMetadata.actorName,
      email: normalizedMetadata.actorEmail,
    },

    source: normalizedMetadata.source,

    createdAt: serverTimestamp(),
  });
}

/**
 * Atualiza campos de várias agências.
 */
async function updateMany({
  ids,
  changes,
  action = 'BATCH_UPDATE',
  metadata = {},
}) {
  const normalizedIds =
    validateAgencyIds(ids);

  if (
    !changes ||
    typeof changes !== 'object' ||
    Object.keys(changes).length === 0
  ) {
    throw new Error(
      'Informe os campos que serão atualizados.',
    );
  }

  const sanitizedChanges =
    removeUndefinedValues(changes);

  delete sanitizedChanges.id;
  delete sanitizedChanges.createdAt;

  const chunks = splitIntoChunks(
    normalizedIds,
    SAFE_BATCH_SIZE,
  );

  let processed = 0;
  const errors = [];

  for (
    let chunkIndex = 0;
    chunkIndex < chunks.length;
    chunkIndex += 1
  ) {
    const chunk = chunks[chunkIndex];

    try {
      const batch = writeBatch(firestore);

      chunk.forEach((agencyId) => {
        const agencyReference =
          getAgencyDocument(agencyId);

        batch.update(agencyReference, {
          ...sanitizedChanges,
          updatedAt: serverTimestamp(),
        });

        const logReference =
          createLogDocumentReference();

        batch.set(
          logReference,
          buildAgencyLog({
            agencyId,
            action,
            changes: sanitizedChanges,
            metadata,
          }),
        );
      });

      await batch.commit();

      processed += chunk.length;
    } catch (error) {
      errors.push({
        chunk: chunkIndex + 1,
        ids: chunk,
        message:
          error?.message ||
          'Erro desconhecido na atualização em lote.',
      });
    }
  }

  return createBatchResult({
    requested: normalizedIds.length,
    processed,
    failed:
      normalizedIds.length - processed,
    batches: chunks.length,
    errors,
  });
}

/**
 * Altera o status de várias agências.
 */
async function updateStatusMany({
  ids,
  status,
  action,
  metadata = {},
  additionalFields = {},
}) {
  if (!status) {
    throw new Error(
      'O novo status é obrigatório.',
    );
  }

  const normalizedMetadata =
    normalizeBatchMetadata(metadata);

  const changes = {
    status,

    statusReason:
      normalizedMetadata.reason || '',

    ...additionalFields,
  };

  return updateMany({
    ids,
    changes,
    action,
    metadata: normalizedMetadata,
  });
}

/**
 * Exclui várias agências usando writeBatch.
 */
async function removeMany({
  ids,
  metadata = {},
}) {
  const normalizedIds =
    validateAgencyIds(ids);

  const chunks = splitIntoChunks(
    normalizedIds,
    SAFE_BATCH_SIZE,
  );

  let processed = 0;
  const errors = [];

  for (
    let chunkIndex = 0;
    chunkIndex < chunks.length;
    chunkIndex += 1
  ) {
    const chunk = chunks[chunkIndex];

    try {
      const batch = writeBatch(firestore);

      chunk.forEach((agencyId) => {
        const agencyReference =
          getAgencyDocument(agencyId);

        batch.delete(agencyReference);

        const logReference =
          createLogDocumentReference();

        batch.set(
          logReference,
          buildAgencyLog({
            agencyId,
            action: 'BATCH_DELETE',
            metadata,
          }),
        );
      });

      await batch.commit();

      processed += chunk.length;
    } catch (error) {
      errors.push({
        chunk: chunkIndex + 1,
        ids: chunk,
        message:
          error?.message ||
          'Erro desconhecido na exclusão em lote.',
      });
    }
  }

  return createBatchResult({
    requested: normalizedIds.length,
    processed,
    failed:
      normalizedIds.length - processed,
    batches: chunks.length,
    errors,
  });
}

/**
 * Exclusão individual segura.
 */
async function removeOne({
  id,
  metadata = {},
}) {
  if (!id) {
    throw new Error(
      'O identificador da agência é obrigatório.',
    );
  }

  const agencyReference =
    getAgencyDocument(id);

  const snapshot =
    await getDoc(agencyReference);

  if (!snapshot.exists()) {
    return false;
  }

  await deleteDoc(agencyReference);

  const logBatch = writeBatch(firestore);

  const logReference =
    createLogDocumentReference();

  logBatch.set(
    logReference,
    buildAgencyLog({
      agencyId: id,
      action: 'DELETE',
      metadata,
    }),
  );

  await logBatch.commit();

  return true;
}

export const agencyBatchRepository = {
  async updateMany(
    ids,
    changes,
    metadata = {},
  ) {
    try {
      return await updateMany({
        ids,
        changes,
        metadata,
        action: 'BATCH_UPDATE',
      });
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível atualizar as agências selecionadas.',
      );
    }
  },

  async approveMany(
    ids,
    metadata = {},
  ) {
    try {
      return await updateStatusMany({
        ids,

        status: 'Ativa',

        action: 'BATCH_APPROVE',

        metadata,

        additionalFields: {
          approvedAt: serverTimestamp(),
          rejectedAt: null,
          suspendedAt: null,
          inactivatedAt: null,
        },
      });
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível aprovar as agências selecionadas.',
      );
    }
  },

  async rejectMany(
    ids,
    reason,
    metadata = {},
  ) {
    try {
      const normalizedReason =
        String(reason || '').trim();

      if (!normalizedReason) {
        throw new Error(
          'Informe o motivo da rejeição.',
        );
      }

      return await updateStatusMany({
        ids,

        status: 'Rejeitada',

        action: 'BATCH_REJECT',

        metadata: {
          ...metadata,
          reason: normalizedReason,
        },

        additionalFields: {
          rejectedAt: serverTimestamp(),
        },
      });
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível rejeitar as agências selecionadas.',
      );
    }
  },

  async suspendMany(
    ids,
    reason,
    metadata = {},
  ) {
    try {
      const normalizedReason =
        String(reason || '').trim();

      return await updateStatusMany({
        ids,

        status: 'Suspensa',

        action: 'BATCH_SUSPEND',

        metadata: {
          ...metadata,
          reason: normalizedReason,
        },

        additionalFields: {
          suspendedAt: serverTimestamp(),
        },
      });
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível suspender as agências selecionadas.',
      );
    }
  },

  async inactivateMany(
    ids,
    metadata = {},
  ) {
    try {
      return await updateStatusMany({
        ids,

        status: 'Inativa',

        action: 'BATCH_INACTIVATE',

        metadata,

        additionalFields: {
          inactivatedAt:
            serverTimestamp(),
        },
      });
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível inativar as agências selecionadas.',
      );
    }
  },

  async reactivateMany(
    ids,
    metadata = {},
  ) {
    try {
      return await updateStatusMany({
        ids,

        status: 'Ativa',

        action: 'BATCH_REACTIVATE',

        metadata,

        additionalFields: {
          reactivatedAt:
            serverTimestamp(),

          suspendedAt: null,
          inactivatedAt: null,
          rejectedAt: null,
        },
      });
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível reativar as agências selecionadas.',
      );
    }
  },

  async removeMany(
    ids,
    metadata = {},
  ) {
    try {
      return await removeMany({
        ids,
        metadata,
      });
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível excluir as agências selecionadas.',
      );
    }
  },

  async removeOne(
    id,
    metadata = {},
  ) {
    try {
      return await removeOne({
        id,
        metadata,
      });
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível excluir a agência.',
      );
    }
  },
};

export default agencyBatchRepository;
