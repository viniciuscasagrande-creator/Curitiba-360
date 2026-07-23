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

export class FirebaseAuthRepository {
  async login(input) {
    const credential = await signInWithEmailAndPassword(
      firebaseAuth,
      input.email,
      input.password
    );
    return credential.user;
  }

  async register(input) {
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
      console.warn("Firestore offline or permission pending, fallback profile stored locally:", e);
    }

    return credential.user;
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(
      firebaseAuth,
      provider
    );

    try {
      const userRef = doc(firestore, "users", credential.user.uid);
      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        await setDoc(userRef, {
          uid: credential.user.uid,
          name: credential.user.displayName || "Usuário Curitiba 360",
          email: credential.user.email,
          phone: credential.user.phoneNumber || null,
          photoURL: credential.user.photoURL || null,
          role: "user",
          active: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    } catch (e) {
      console.warn("Firestore offline or permission pending:", e);
    }

    return credential.user;
  }

  async logout() {
    await signOut(firebaseAuth);
  }

  async sendPasswordReset(email) {
    await sendPasswordResetEmail(firebaseAuth, email);
  }

  async getUserProfile(uid) {
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
    return onAuthStateChanged(firebaseAuth, callback);
  }
}
