import {
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';

import {
  firebaseApp,
  useFirebaseEmulators,
} from './firebase';

export const firestore =
  getFirestore(firebaseApp);

let emulatorConnected = false;

export function connectFirestoreDevelopmentEmulator() {
  if (
    !useFirebaseEmulators ||
    emulatorConnected
  ) {
    return;
  }

  connectFirestoreEmulator(
    firestore,
    '127.0.0.1',
    8080,
  );

  emulatorConnected = true;

  console.info(
    '[Firebase] Firestore Emulator conectado em 127.0.0.1:8080',
  );
}

connectFirestoreDevelopmentEmulator();

export default firestore;
