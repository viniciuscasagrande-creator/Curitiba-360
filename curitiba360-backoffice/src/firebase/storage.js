import {
  connectStorageEmulator,
  getStorage,
} from 'firebase/storage';

import {
  firebaseApp,
  useFirebaseEmulators,
} from './firebase';

export const firebaseStorage =
  getStorage(firebaseApp);

let emulatorConnected = false;

export function connectStorageDevelopmentEmulator() {
  if (
    !useFirebaseEmulators ||
    emulatorConnected
  ) {
    return;
  }

  connectStorageEmulator(
    firebaseStorage,
    '127.0.0.1',
    9199,
  );

  emulatorConnected = true;

  console.info(
    '[Firebase] Storage Emulator conectado em 127.0.0.1:9199',
  );
}

connectStorageDevelopmentEmulator();

export default firebaseStorage;
