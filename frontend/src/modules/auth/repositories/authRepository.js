export async function signInWithEmailRepository({
  email,
  password,
  rememberMe,
}) {
  if (!email || !password) {
    throw new Error("E-mail e senha são obrigatórios.");
  }

  // Firebase será conectado depois.
  //
  // const persistence = rememberMe
  //   ? browserLocalPersistence
  //   : browserSessionPersistence;
  //
  // await setPersistence(auth, persistence);
  //
  // const credential = await signInWithEmailAndPassword(
  //   auth,
  //   email,
  //   password
  // );
  //
  // return credential.user;

  return {
    uid: "local-user",
    email,
    displayName: "Usuário Curitiba 360",
    role: "user",
    emailVerified: true,
    rememberMe,
  };
}

export async function signInWithGoogleRepository() {
  // Integração futura:
  //
  // const provider = new GoogleAuthProvider();
  // const credential = await signInWithPopup(auth, provider);
  // return credential.user;

  return {
    uid: "google-local-user",
    email: "usuario@google.com",
    displayName: "Usuário Google",
    role: "user",
    emailVerified: true,
  };
}

export async function registerUserRepository({
  name,
  email,
  phone,
  password,
}) {
  if (!name || !email || !password) {
    throw new Error("Preencha os dados obrigatórios.");
  }

  // Integração futura:
  //
  // const credential = await createUserWithEmailAndPassword(
  //   auth,
  //   email,
  //   password
  // );
  //
  // await updateProfile(credential.user, {
  //   displayName: name,
  // });
  //
  // await setDoc(doc(db, "users", credential.user.uid), {
  //   name,
  //   email,
  //   phone,
  //   role: "user",
  //   status: "pending-verification",
  //   createdAt: serverTimestamp(),
  // });
  //
  // await sendEmailVerification(credential.user);
  //
  // return credential.user;

  return {
    uid: crypto.randomUUID(),
    name,
    email,
    phone,
    role: "user",
    status: "pending-verification",
    emailVerified: false,
  };
}

export async function signOutRepository() {
  // await signOut(auth);
  return true;
}

export function subscribeToAuthStateRepository(callback) {
  // Firebase:
  //
  // return onAuthStateChanged(auth, callback);

  const storedUser = localStorage.getItem(
    "curitiba360:auth-user"
  );

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  callback(user);

  return () => {};
}
export const authRepository = {
  signInWithEmail: signInWithEmailRepository,
  signInWithGoogle: signInWithGoogleRepository,
  registerUser: registerUserRepository,
  signOut: signOutRepository,
  subscribeToAuthState: subscribeToAuthStateRepository,
};
