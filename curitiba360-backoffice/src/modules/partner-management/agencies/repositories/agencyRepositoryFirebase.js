import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
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
  serializeAgencyForFirestore,
} from '../utils/firestoreDataMapper';

import {
  buildAgencyQuery,
} from './agencyQueryBuilder';

const COLLECTION_NAME =
  FIREBASE_COLLECTIONS.AGENCIES;

function getAgenciesCollection() {
  return collection(
    firestore,
    COLLECTION_NAME,
  );
}

function getAgencyDocument(id) {
  if (!id) {
    throw new Error(
      'O identificador da agência é obrigatório.',
    );
  }

  return doc(
    firestore,
    COLLECTION_NAME,
    id,
  );
}

/**
 * Repository responsável exclusivamente pelo acesso
 * ao Firestore.
 *
 * Regras de negócio devem continuar no AgencyService.
 */
export const agencyRepositoryFirebase = {
  /**
   * Lista as agências mais recentes.
   */
  async list({
    pageSize = 100,
  } = {}) {
    try {
      const agenciesQuery = query(
        getAgenciesCollection(),
        orderBy('createdAt', 'desc'),
        limit(pageSize),
      );

      const snapshot =
        await getDocs(agenciesQuery);

      return snapshot.docs.map(
        deserializeAgencyFromFirestore,
      );
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível carregar as agências.',
      );
    }
  },

  /**
   * Lista agências paginadas com filtros e ordenação.
   */
  async paginate({
    filters = {},
    sorting = {
      field: 'createdAt',
      direction: 'desc',
    },
    pageSize = 20,
    cursor = null,
  } = {}) {
    try {
      const {
        firestoreQuery,
        metadata,
      } = buildAgencyQuery({
        collectionReference:
          getAgenciesCollection(),

        filters,
        sorting,
        pageSize,
        cursor,
      });

      const snapshot =
        await getDocs(
          firestoreQuery,
        );

      const documents =
        snapshot.docs;

      const hasNextPage =
        documents.length > pageSize;

      const visibleDocuments =
        hasNextPage
          ? documents.slice(
              0,
              pageSize,
            )
          : documents;

      const agencies =
        visibleDocuments.map(
          deserializeAgencyFromFirestore,
        );

      const lastDocument =
        visibleDocuments[
          visibleDocuments.length - 1
        ] || null;

      return {
        data: agencies,

        pagination: {
          pageSize,
          hasNextPage,

          nextCursor:
            hasNextPage
              ? lastDocument
              : null,

          returned:
            agencies.length,
        },

        metadata,
      };
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível carregar as agências.',
      );
    }
  },

  /**
   * Busca uma agência pelo CNPJ.
   */
  async findByCnpj(cnpj) {
    try {
      const normalizedCnpj =
        String(cnpj || '')
          .replace(/\D/g, '');

      if (!normalizedCnpj) {
        return null;
      }

      const cnpjQuery = query(
        getAgenciesCollection(),

        where(
          'searchCnpj',
          '==',
          normalizedCnpj,
        ),

        limit(1),
      );

      const snapshot =
        await getDocs(cnpjQuery);

      if (snapshot.empty) {
        return null;
      }

      return deserializeAgencyFromFirestore(
        snapshot.docs[0],
      );
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível pesquisar o CNPJ.',
      );
    }
  },

  /**
   * Busca uma agência pelo E-mail.
   */
  async findByEmail(email) {
    try {
      const normalizedEmail =
        String(email || '')
          .trim()
          .toLowerCase();

      if (!normalizedEmail) {
        return null;
      }

      const emailQuery = query(
        getAgenciesCollection(),

        where(
          'searchEmail',
          '==',
          normalizedEmail,
        ),

        limit(1),
      );

      const snapshot =
        await getDocs(emailQuery);

      if (snapshot.empty) {
        return null;
      }

      return deserializeAgencyFromFirestore(
        snapshot.docs[0],
      );
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível pesquisar o e-mail.',
      );
    }
  },

  /**
   * Busca uma agência pelo ID.
   */
  async findById(id) {
    try {
      const agencyReference =
        getAgencyDocument(id);

      const snapshot =
        await getDoc(agencyReference);

      if (!snapshot.exists()) {
        return null;
      }

      return deserializeAgencyFromFirestore(
        snapshot,
      );
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível carregar a agência.',
      );
    }
  },

  /**
   * Verifica se uma agência existe.
   */
  async exists(id) {
    try {
      const snapshot =
        await getDoc(
          getAgencyDocument(id),
        );

      return snapshot.exists();
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível verificar a agência.',
      );
    }
  },

  /**
   * Cria uma agência com ID automático.
   */
  async create(payload) {
    try {
      const agencyData =
        serializeAgencyForFirestore(
          payload,
        );

      const documentReference =
        await addDoc(
          getAgenciesCollection(),
          {
            ...agencyData,

            status:
              agencyData.status ||
              'Pendente de Aprovação',

            agentsCount:
              agencyData.agentsCount ??
              0,

            attractionsCount:
              agencyData
                .attractionsCount ?? 0,

            documentsCount:
              agencyData.documents
                ?.length ?? 0,

            createdAt:
              serverTimestamp(),

            updatedAt:
              serverTimestamp(),
          },
        );

      const createdSnapshot =
        await getDoc(
          documentReference,
        );

      return deserializeAgencyFromFirestore(
        createdSnapshot,
      );
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível cadastrar a agência.',
      );
    }
  },

  /**
   * Cria uma agência usando um ID informado.
   */
  async createWithId(
    id,
    payload,
  ) {
    try {
      const documentReference =
        getAgencyDocument(id);

      const agencyData =
        serializeAgencyForFirestore(
          payload,
        );

      await setDoc(
        documentReference,
        {
          ...agencyData,

          status:
            agencyData.status ||
            'Pendente de Aprovação',

          agentsCount:
            agencyData.agentsCount ?? 0,

          attractionsCount:
            agencyData
              .attractionsCount ?? 0,

          documentsCount:
            agencyData.documents
              ?.length ?? 0,

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp(),
        },
      );

      const createdSnapshot =
        await getDoc(
          documentReference,
        );

      return deserializeAgencyFromFirestore(
        createdSnapshot,
      );
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível cadastrar a agência.',
      );
    }
  },

  /**
   * Atualiza uma agência existente.
   */
  async update(
    id,
    payload,
  ) {
    try {
      const documentReference =
        getAgencyDocument(id);

      const currentSnapshot =
        await getDoc(
          documentReference,
        );

      if (!currentSnapshot.exists()) {
        throw new Error(
          'A agência informada não foi encontrada.',
        );
      }

      const agencyData =
        serializeAgencyForFirestore(
          payload,
        );

      delete agencyData.id;
      delete agencyData.createdAt;

      await updateDoc(
        documentReference,
        {
          ...agencyData,

          documentsCount:
            agencyData.documents
              ?.length ?? 0,

          updatedAt:
            serverTimestamp(),
        },
      );

      const updatedSnapshot =
        await getDoc(
          documentReference,
        );

      return deserializeAgencyFromFirestore(
        updatedSnapshot,
      );
    } catch (error) {
      if (
        error.message ===
        'A agência informada não foi encontrada.'
      ) {
        throw error;
      }

      throw mapFirebaseError(
        error,
        'Não foi possível atualizar a agência.',
      );
    }
  },

  /**
   * Atualização parcial.
   */
  async patch(
    id,
    changes,
  ) {
    try {
      const documentReference =
        getAgencyDocument(id);

      const sanitizedChanges =
        serializeAgencyForFirestore(
          changes,
        );

      delete sanitizedChanges.id;
      delete sanitizedChanges.createdAt;

      await updateDoc(
        documentReference,
        {
          ...sanitizedChanges,
          updatedAt:
            serverTimestamp(),
        },
      );

      const updatedSnapshot =
        await getDoc(
          documentReference,
        );

      return deserializeAgencyFromFirestore(
        updatedSnapshot,
      );
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível alterar a agência.',
      );
    }
  },

  /**
   * Atualiza o status da agência.
   */
  async updateStatus(
    id,
    status,
    metadata = {},
  ) {
    try {
      if (!status) {
        throw new Error(
          'O novo status é obrigatório.',
        );
      }

      const documentReference =
        getAgencyDocument(id);

      await updateDoc(
        documentReference,
        {
          status,
          ...metadata,
          updatedAt:
            serverTimestamp(),
        },
      );

      const updatedSnapshot =
        await getDoc(
          documentReference,
        );

      return deserializeAgencyFromFirestore(
        updatedSnapshot,
      );
    } catch (error) {
      if (
        error.message ===
        'O novo status é obrigatório.'
      ) {
        throw error;
      }

      throw mapFirebaseError(
        error,
        'Não foi possível alterar o status da agência.',
      );
    }
  },

  /**
   * Exclui definitivamente uma agência.
   */
  async remove(id) {
    try {
      const documentReference =
        getAgencyDocument(id);

      const currentSnapshot =
        await getDoc(
          documentReference,
        );

      if (!currentSnapshot.exists()) {
        return false;
      }

      await deleteDoc(
        documentReference,
      );

      return true;
    } catch (error) {
      throw mapFirebaseError(
        error,
        'Não foi possível excluir a agência.',
      );
    }
  },
};

export default agencyRepositoryFirebase;
