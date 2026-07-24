import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
} from 'firebase/auth';

import {
  firebaseApp,
  useFirebaseEmulators,
} from './firebase';

export const firebaseAuth =
  getAuth(firebaseApp);

let emulatorConnected = false;

export async function configureFirebaseAuth() {
  try {
    await setPersistence(
      firebaseAuth,
      browserLocalPersistence,
    );
  } catch (error) {
    console.error(
      '[Firebase] Não foi possível configurar a persistência da autenticação.',
      error,
    );
  }

  if (
    useFirebaseEmulators &&
    !emulatorConnected
  ) {
    connectAuthEmulator(
      firebaseAuth,
      'http://127.0.0.1:9099',
      {
        disableWarnings: true,
      },
    );

    emulatorConnected = true;

    console.info(
      '[Firebase] Auth Emulator conectado em 127.0.0.1:9099',
    );
  }

  return firebaseAuth;
}

export default firebaseAuth;
