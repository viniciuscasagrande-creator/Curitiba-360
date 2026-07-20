import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Default user configuration
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "curitiba360-backoffice.firebaseapp.com",
  projectId: "curitiba360-backoffice",
  storageBucket: "curitiba360-backoffice.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Resolve o RF-001
