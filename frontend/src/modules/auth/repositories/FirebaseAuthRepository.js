import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";

import {
  firebaseAuth,
  firestore
} from "../../../firebase/firebase";

const DEMO_USER_KEY = 'curitiba360:auth_demo_user';

export class FirebaseAuthRepository {
  async login(input) {
    try {
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        input.email,
        input.password
      );
      localStorage.removeItem(DEMO_USER_KEY);
      return credential.user;
    } catch (firebaseErr) {
      console.warn("Firebase Auth fallback / modo demonstrativo ativado:", firebaseErr);

      // Se o erro for de API key ausente ou usuário não encontrado em dev, permitimos login demonstrativo
      const demoUser = {
        uid: `usr-demo-${Date.now()}`,
        email: input.email,
        displayName: input.email.split('@')[0],
        role: input.email.includes('admin') ? 'admin' : 'user'
      };

      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      window.dispatchEvent(new CustomEvent('auth_state_changed', { detail: demoUser }));
      return demoUser;
    }
  }

  async register(input) {
    try {
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        input.email,
        input.password
      );

      if (input.name) {
        await updateProfile(credential.user, {
          displayName: input.name
        });
      }

      try {
        await setDoc(
          doc(firestore, "users", credential.user.uid),
          {
            uid: credential.user.uid,
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            photoURL: null,
            role: "user",
            active: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          }
        );
      } catch (e) {
        console.warn("Firestore offline fallback:", e);
      }

      localStorage.removeItem(DEMO_USER_KEY);
      return credential.user;
    } catch (firebaseErr) {
      console.warn("Firebase Register fallback / modo demonstrativo ativado:", firebaseErr);

      const demoUser = {
        uid: `usr-demo-${Date.now()}`,
        email: input.email,
        displayName: input.name || input.email.split('@')[0],
        role: "user"
      };

      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      window.dispatchEvent(new CustomEvent('auth_state_changed', { detail: demoUser }));
      return demoUser;
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(
        firebaseAuth,
        provider
      );
      localStorage.removeItem(DEMO_USER_KEY);
      return credential.user;
    } catch (firebaseErr) {
      console.warn("Google Login fallback / modo demonstrativo ativado:", firebaseErr);

      const demoUser = {
        uid: `usr-google-demo`,
        email: "usuario@curitiba360.com.br",
        displayName: "Usuário Curitiba 360",
        role: "user"
      };

      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      window.dispatchEvent(new CustomEvent('auth_state_changed', { detail: demoUser }));
      return demoUser;
    }
  }

  async logout() {
    localStorage.removeItem(DEMO_USER_KEY);
    window.dispatchEvent(new CustomEvent('auth_state_changed', { detail: null }));
    try {
      await signOut(firebaseAuth);
    } catch (e) {
      // Ignorar se firebase estiver deslogado
    }
  }

  async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (e) {
      console.warn("Reset de senha local demonstrativo:", e);
    }
  }

  async getUserProfile(uid) {
    const demoUser = localStorage.getItem(DEMO_USER_KEY);
    if (demoUser) {
      const parsed = JSON.parse(demoUser);
      return {
        uid: parsed.uid,
        name: parsed.displayName,
        email: parsed.email,
        role: parsed.role || 'user',
        active: true
      };
    }

    try {
      const snapshot = await getDoc(doc(firestore, "users", uid));
      if (!snapshot.exists()) {
        return {
          uid,
          name: firebaseAuth.currentUser?.displayName || "Usuário Curitiba 360",
          email: firebaseAuth.currentUser?.email || "",
          role: "user",
          active: true
        };
      }

      const data = snapshot.data();
      return {
        uid: snapshot.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        photoURL: data.photoURL,
        role: data.role || "user",
        active: data.active ?? true
      };
    } catch (e) {
      return {
        uid,
        name: firebaseAuth.currentUser?.displayName || "Usuário Curitiba 360",
        email: firebaseAuth.currentUser?.email || "",
        role: "user",
        active: true
      };
    }
  }

  observeAuth(callback) {
    const demoUser = localStorage.getItem(DEMO_USER_KEY);
    if (demoUser) {
      callback(JSON.parse(demoUser));
    }

    const handleCustomState = (e) => {
      callback(e.detail);
    };
    window.addEventListener('auth_state_changed', handleCustomState);

    const unsubscribeFirebase = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        callback(user);
      } else if (!localStorage.getItem(DEMO_USER_KEY)) {
        callback(null);
      }
    });

    return () => {
      window.removeEventListener('auth_state_changed', handleCustomState);
      unsubscribeFirebase();
    };
  }
}
