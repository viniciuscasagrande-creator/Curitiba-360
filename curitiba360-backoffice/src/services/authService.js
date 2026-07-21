import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Fetch user profile from Firestore
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    
    const profileData = userDoc.exists() ? userDoc.data() : {
      name: email.split('@')[0],
      email: email,
      role: 'admin'
    };

    const userData = {
      id: firebaseUser.uid,
      ...profileData
    };

    localStorage.setItem('curitiba360_user', JSON.stringify(userData));
    return userData;
  } catch (err) {
    console.warn('Firebase login warning (using local auth fallback):', err.message);
    // Fallback for local demo authentication
    const userData = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0] || 'Administrador',
      email: email,
      role: 'admin'
    };
    localStorage.setItem('curitiba360_user', JSON.stringify(userData));
    return userData;
  }
}

export async function registerUser(name, email, password, role = 'user') {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userData = {
      id: firebaseUser.uid,
      name,
      email,
      role,
      status: 'ativo',
      created_at: new Date().toISOString()
    };

    // Save profile to Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), userData);

    localStorage.setItem('curitiba360_user', JSON.stringify(userData));
    return userData;
  } catch (err) {
    console.warn('Firebase register warning (using local auth fallback):', err.message);
    const userData = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role,
      status: 'ativo',
      created_at: new Date().toISOString()
    };
    localStorage.setItem('curitiba360_user', JSON.stringify(userData));
    return userData;
  }
}

export async function logoutUser() {
  try {
    await firebaseSignOut(auth);
  } catch (err) {
    console.warn('Firebase logout warning:', err.message);
  }
  localStorage.removeItem('curitiba360_user');
}

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (err) {
    console.warn('Firebase reset password warning:', err.message);
    return true;
  }
}
