import {
  initializeFirestore,
  memoryLocalCache,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

import {
  firebaseApp,
} from './firebase';

function shouldUsePersistentCache() {
  return (
    import.meta.env
      .VITE_FIREBASE_PERSISTENCE !==
    'false'
  );
}

function createFirestoreSettings() {
  if (!shouldUsePersistentCache()) {
    return {
      localCache: memoryLocalCache(),
    };
  }

  return {
    localCache: persistentLocalCache({
      tabManager:
        persistentMultipleTabManager(),
    }),
  };
}

export const firestore =
  initializeFirestore(
    firebaseApp,
    createFirestoreSettings(),
  );

export function connectFirestoreDevelopmentEmulator() {
  // Configurações do emulador local, se necessário.
}

export default firestore;
