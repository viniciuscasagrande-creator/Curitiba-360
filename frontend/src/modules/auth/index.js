import { FirebaseAuthRepository } from "./repositories/FirebaseAuthRepository";
import { AuthService } from "./services/authService";

const authRepository = new FirebaseAuthRepository();
export const authService = new AuthService(authRepository);

export { FirebaseAuthRepository } from "./repositories/FirebaseAuthRepository";
export { AuthService } from "./services/authService";
export { useAuth } from "./hooks/useAuth";

export { default as LoginPage } from "./pages/LoginPage";
export { default as RegisterPage } from "./pages/RegisterPage";
export { default as ForgotPasswordPage } from "./pages/ForgotPasswordPage";
