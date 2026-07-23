import { FirebaseAuthRepository } from "../repositories/FirebaseAuthRepository";

const defaultRepo = new FirebaseAuthRepository();

export class AuthService {
  constructor(repository = defaultRepo) {
    this.repository = repository;
  }

  async login(input) {
    const email = input.email.trim().toLowerCase();
    return this.repository.login({
      ...input,
      email
    });
  }

  async register(input) {
    return this.repository.register({
      ...input,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase()
    });
  }

  async loginWithGoogle() {
    return this.repository.loginWithGoogle();
  }

  async logout() {
    return this.repository.logout();
  }

  async recoverPassword(email) {
    return this.repository.sendPasswordReset(email.trim().toLowerCase());
  }

  async getProfile(uid) {
    const profile = await this.repository.getUserProfile(uid);

    if (profile && !profile.active) {
      throw new Error("Esta conta está desativada.");
    }

    return profile;
  }

  observeAuth(callback) {
    return this.repository.observeAuth(callback);
  }
}

export const authService = new AuthService(defaultRepo);

export const loginWithEmail = (input) => authService.login(input);
export const loginWithGoogle = () => authService.loginWithGoogle();
export const logoutUser = () => authService.logout();
export const registerUser = (input) => authService.register(input);
export const reloadCurrentUser = async () => authService.repository.getUserProfile('current');
export const resendVerificationEmail = async () => true;
