import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCejZgT4TT25H2oP4PH-8pD60gKYuZ4e3M",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "curitiba360defaut.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "curitiba360defaut",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "curitiba360defaut.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "34480527716",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:34480527716:web:3933cd6468762453874271"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
