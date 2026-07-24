import {
  collection,
  getDocs,
  limit,
  query,
} from 'firebase/firestore';

import {
  firestore,
} from './firestore';

import {
  FIREBASE_COLLECTIONS,
} from './firebaseCollections';

export async function testFirebaseConnection() {
  try {
    const agenciesQuery = query(
      collection(
        firestore,
        FIREBASE_COLLECTIONS.AGENCIES,
      ),
      limit(1),
    );

    const snapshot =
      await getDocs(agenciesQuery);

    console.info(
      '[Firebase] Conexão com Firestore estabelecida.',
      {
        documents:
          snapshot.size,
      },
    );

    return true;
  } catch (error) {
    console.error(
      '[Firebase] Falha ao conectar com o Firestore.',
      error,
    );

    return false;
  }
}
