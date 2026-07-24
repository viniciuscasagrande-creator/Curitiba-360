import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
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
  deserializeAgencyFromFirestore,
} from '../utils/firestoreDataMapper';

import {
  AGENCY_CHANGE_TYPES,
  createAgencyChange,
  normalizeRealtimeFilters,
  normalizeRealtimeLimit,
  normalizeRealtimeSorting,
} from '../utils/agencyRealtimeUtils';

const COLLECTION_NAME =
  FIREBASE_COLLECTIONS.AGENCIES;

function getAgenciesCollection() {
  return collection(
    firestore,
    COLLECTION_NAME,
  );
}

function getAgencyDocument(agencyId) {
  if (!agencyId) {
    throw new Error(
      'O identificador da agência é obrigatório.',
    );
  }

  return doc(
    firestore,
    COLLECTION_NAME,
    agencyId,
  );
}

function buildRealtimeAgencyQuery({
  filters = {},
  sorting = {},
  pageSize = 100,
} = {}) {
  const normalizedFilters =
    normalizeRealtimeFilters(filters);

  const normalizedSorting =
    normalizeRealtimeSorting(sorting);

  const normalizedPageSize =
    normalizeRealtimeLimit(pageSize);

  const constraints = [];

  if (normalizedFilters.status) {
    constraints.push(
      where(
        'status',
        '==',
        normalizedFilters.status,
      ),
    );
  }

  if (normalizedFilters.state) {
    constraints.push(
      where(
        'state',
        '==',
        normalizedFilters.state,
      ),
    );
  }

  if (
    normalizedFilters.cityNormalized
  ) {
    constraints.push(
      where(
        'cityNormalized',
        '==',
        normalizedFilters.cityNormalized,
      ),
    );
  }

  if (
    normalizedFilters.companyType
  ) {
    constraints.push(
      where(
        'companyType',
        '==',
        normalizedFilters.companyType,
      ),
    );
  }

  constraints.push(
    orderBy(
      normalizedSorting.field,
      normalizedSorting.direction,
    ),
  );

  constraints.push(
    limit(normalizedPageSize),
  );

  return {
    firestoreQuery: query(
      getAgenciesCollection(),
      ...constraints,
    ),

    metadata: {
      filters: normalizedFilters,
      sorting: normalizedSorting,
      pageSize: normalizedPageSize,
    },
  };
}

function mapSnapshotChanges(snapshot) {
  return snapshot
    .docChanges()
    .map((change) => {
      const agency =
        deserializeAgencyFromFirestore(
          change.doc,
        );

      return createAgencyChange({
        type: change.type,
        agency,
        oldIndex: change.oldIndex,
        newIndex: change.newIndex,
        hasPendingWrites:
          change.doc.metadata
            .hasPendingWrites,
      });
    });
}

function getChangesSummary(changes) {
  return changes.reduce(
    (summary, change) => {
      if (
        change.type ===
        AGENCY_CHANGE_TYPES.ADDED
      ) {
        summary.added += 1;
      }

      if (
        change.type ===
        AGENCY_CHANGE_TYPES.MODIFIED
      ) {
        summary.modified += 1;
      }

      if (
        change.type ===
        AGENCY_CHANGE_TYPES.REMOVED
      ) {
        summary.removed += 1;
      }

      return summary;
    },
    {
      added: 0,
      modified: 0,
      removed: 0,
    },
  );
}

export const agencyRealtimeRepository = {
  /**
   * Escuta uma lista de agências.
   *
   * Retorna a função unsubscribe do Firestore.
   */
  subscribeToList({
    filters = {},
    sorting = {
      field: 'createdAt',
      direction: 'desc',
    },
    pageSize = 100,
    includeMetadataChanges = true,

    onData,
    onError,
    onStatusChange,
  } = {}) {
    try {
      const {
        firestoreQuery,
        metadata,
      } = buildRealtimeAgencyQuery({
        filters,
        sorting,
        pageSize,
      });

      onStatusChange?.({
        status: 'connecting',
        isConnected: false,
        metadata,
      });

      const unsubscribe = onSnapshot(
        firestoreQuery,

        {
          includeMetadataChanges,
        },

        (snapshot) => {
          const agencies =
            snapshot.docs.map(
              deserializeAgencyFromFirestore,
            );

          const changes =
            mapSnapshotChanges(snapshot);

          const hasPendingWrites =
            snapshot.docs.some(
              (documentSnapshot) =>
                documentSnapshot.metadata
                  .hasPendingWrites,
            );

          const payload = {
            data: agencies,

            changes,

            changesSummary:
              getChangesSummary(changes),

            size: snapshot.size,
            empty: snapshot.empty,

            metadata: {
              ...metadata,

              isFromCache:
                snapshot.metadata
                  .fromCache,

              hasPendingWrites,

              receivedAt:
                new Date().toISOString(),
            },
          };

          onStatusChange?.({
            status: hasPendingWrites
              ? 'syncing'
              : 'connected',

            isConnected: true,

            isFromCache:
              snapshot.metadata.fromCache,

            hasPendingWrites,

            lastSyncedAt:
              hasPendingWrites
                ? null
                : new Date().toISOString(),
          });

          onData?.(payload);
        },

        (error) => {
          const mappedError =
            mapFirebaseError(
              error,
              'Não foi possível acompanhar as agências em tempo real.',
            );

          onStatusChange?.({
            status: 'error',
            isConnected: false,
            error: mappedError,
          });

          onError?.(mappedError);
        },
      );

      return () => {
        unsubscribe();

        onStatusChange?.({
          status: 'stopped',
          isConnected: false,
        });
      };
    } catch (error) {
      const mappedError =
        mapFirebaseError(
          error,
          'Não foi possível iniciar a sincronização das agências.',
        );

      onStatusChange?.({
        status: 'error',
        isConnected: false,
        error: mappedError,
      });

      onError?.(mappedError);

      return () => {};
    }
  },

  /**
   * Escuta uma agência específica.
   */
  subscribeToAgency({
    agencyId,
    includeMetadataChanges = true,

    onData,
    onError,
    onStatusChange,
  } = {}) {
    try {
      const agencyReference =
        getAgencyDocument(agencyId);

      onStatusChange?.({
        status: 'connecting',
        isConnected: false,
      });

      const unsubscribe = onSnapshot(
        agencyReference,

        {
          includeMetadataChanges,
        },

        (snapshot) => {
          const agency =
            snapshot.exists()
              ? deserializeAgencyFromFirestore(
                  snapshot,
                )
              : null;

          const hasPendingWrites =
            snapshot.metadata
              .hasPendingWrites;

          onStatusChange?.({
            status: hasPendingWrites
              ? 'syncing'
              : 'connected',

            isConnected: true,

            isFromCache:
              snapshot.metadata.fromCache,

            hasPendingWrites,

            lastSyncedAt:
              hasPendingWrites
                ? null
                : new Date().toISOString(),
          });

          onData?.({
            data: agency,

            exists: snapshot.exists(),

            metadata: {
              isFromCache:
                snapshot.metadata.fromCache,

              hasPendingWrites,

              receivedAt:
                new Date().toISOString(),
            },
          });
        },

        (error) => {
          const mappedError =
            mapFirebaseError(
              error,
              'Não foi possível acompanhar a agência em tempo real.',
            );

          onStatusChange?.({
            status: 'error',
            isConnected: false,
            error: mappedError,
          });

          onError?.(mappedError);
        },
      );

      return () => {
        unsubscribe();

        onStatusChange?.({
          status: 'stopped',
          isConnected: false,
        });
      };
    } catch (error) {
      const mappedError =
        mapFirebaseError(
          error,
          'Não foi possível iniciar o listener da agência.',
        );

      onStatusChange?.({
        status: 'error',
        isConnected: false,
        error: mappedError,
      });

      onError?.(mappedError);

      return () => {};
    }
  },
};

export default agencyRealtimeRepository;
