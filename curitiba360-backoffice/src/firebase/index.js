import {
  configureFirebaseAuth,
  firebaseAuth,
} from './auth';

import {
  firebaseApp,
  firebaseConfig,
  firebaseProjectId,
} from './firebase';

import {
  firestore,
} from './firestore';

import {
  firebaseStorage,
} from './storage';

let initializationPromise = null;

export function initializeFirebaseServices() {
  if (!initializationPromise) {
    initializationPromise =
      configureFirebaseAuth();
  }

  return initializationPromise;
}

export {
  firebaseApp,
  firebaseAuth,
  firebaseConfig,
  firebaseProjectId,
  firebaseStorage,
  firestore,
};
