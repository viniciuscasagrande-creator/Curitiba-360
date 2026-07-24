import {
  getApp,
  getApps,
  initializeApp,
} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

function getRequiredEnv(name) {
  const value = import.meta.env[name];

  if (!value) {
    const defaults = {
      VITE_FIREBASE_API_KEY: 'AIzaSyCejZgT4TT25H2oP4PH-8pD60gKYuZ4e3M',
      VITE_FIREBASE_AUTH_DOMAIN: 'curitiba360defaut.firebaseapp.com',
      VITE_FIREBASE_PROJECT_ID: 'curitiba360defaut',
      VITE_FIREBASE_STORAGE_BUCKET: 'curitiba360defaut.firebasestorage.app',
      VITE_FIREBASE_MESSAGING_SENDER_ID: '34480527716',
      VITE_FIREBASE_APP_ID: '1:34480527716:web:3933cd6468762453874271',
    };
    return defaults[name] || 'demo';
  }

  return value;
}

export const firebaseConfig = {
  apiKey: getRequiredEnv(
    'VITE_FIREBASE_API_KEY',
  ),

  authDomain: getRequiredEnv(
    'VITE_FIREBASE_AUTH_DOMAIN',
  ),

  projectId: getRequiredEnv(
    'VITE_FIREBASE_PROJECT_ID',
  ),

  storageBucket: getRequiredEnv(
    'VITE_FIREBASE_STORAGE_BUCKET',
  ),

  messagingSenderId: getRequiredEnv(
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
  ),

  appId: getRequiredEnv(
    'VITE_FIREBASE_APP_ID',
  ),

  measurementId:
    import.meta.env
      .VITE_FIREBASE_MEASUREMENT_ID ||
    undefined,
};

export const firebaseApp =
  getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

export const firebaseProjectId =
  firebaseConfig.projectId;

export const useFirebaseEmulators =
  import.meta.env
    .VITE_FIREBASE_USE_EMULATORS ===
  'true';
