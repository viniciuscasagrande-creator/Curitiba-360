import {
  registerUserRepository,
  signInWithEmailRepository,
  signInWithGoogleRepository,
  signOutRepository,
} from "../repositories/authRepository";

const AUTH_STORAGE_KEY = "curitiba360:auth-user";

function persistUser(user) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(user)
  );
}

function removePersistedUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function loginWithEmail(data) {
  const user = await signInWithEmailRepository({
    email: data.email.trim().toLowerCase(),
    password: data.password,
    rememberMe: Boolean(data.rememberMe),
  });

  persistUser(user);

  return user;
}

export async function loginWithGoogle() {
  const user = await signInWithGoogleRepository();

  persistUser(user);

  return user;
}

export async function registerUser(data) {
  const user = await registerUserRepository({
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    password: data.password,
  });

  persistUser(user);

  return user;
}

export async function logoutUser() {
  await signOutRepository();
  removePersistedUser();
}

export async function resendVerificationEmail() {
  // Firebase:
  //
  // if (!auth.currentUser) {
  //   throw new Error(
  //     "Não existe usuário autenticado."
  //   );
  // }
  //
  // await sendEmailVerification(
  //   auth.currentUser
  // );
  return true;
}

export async function reloadCurrentUser() {
  // Firebase:
  //
  // if (!auth.currentUser) {
  //   throw new Error(
  //     "Não existe usuário autenticado."
  //   );
  // }
  //
  // await reload(auth.currentUser);
  //
  // const updatedUser = {
  //   uid: auth.currentUser.uid,
  //   email: auth.currentUser.email,
  //   displayName:
  //     auth.currentUser.displayName,
  //   emailVerified:
  //     auth.currentUser.emailVerified,
  // };
  //
  // persistUser(updatedUser);
  //
  // return updatedUser;

  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (user) {
    persistUser(user);
  }
  return user;
}
