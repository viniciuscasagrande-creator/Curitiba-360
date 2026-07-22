export {
  AuthProvider,
  AuthContext,
} from "./contexts/AuthContext";

export { useAuth } from "./hooks/useAuth";

export { default as LoginPage } from "./pages/LoginPage";
export { default as ForgotPasswordPage } from "./pages/ForgotPasswordPage";
export { default as RecoveryEmailSentPage } from "./pages/RecoveryEmailSentPage";
export { default as ResetPasswordPage } from "./pages/ResetPasswordPage";
export { default as RegisterPage } from "./pages/RegisterPage";
export { default as EmailConfirmationPage } from "./pages/EmailConfirmationPage";
export { default as RegisterSuccessPage } from "./pages/RegisterSuccessPage";

export {
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerUser,
  reloadCurrentUser,
  resendVerificationEmail,
} from "./services/authService";

export {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./schemas/authSchemas";
