import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerUser,
  reloadCurrentUser,
  resendVerificationEmail,
} from "../services/authService";

import {
  subscribeToAuthStateRepository,
} from "../repositories/authRepository";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      subscribeToAuthStateRepository(
        (authenticatedUser) => {
          setUser(authenticatedUser);
          setInitializing(false);
        }
      );

    return unsubscribe;
  }, []);

  const login = useCallback(async (credentials) => {
    const authenticatedUser =
      await loginWithEmail(credentials);

    setUser(authenticatedUser);

    return authenticatedUser;
  }, []);

  const loginGoogle = useCallback(async () => {
    const authenticatedUser =
      await loginWithGoogle();

    setUser(authenticatedUser);

    return authenticatedUser;
  }, []);

  const register = useCallback(async (data) => {
    const registeredUser =
      await registerUser(data);

    setUser(registeredUser);

    return registeredUser;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const resendConfirmation = useCallback(async () => {
    return resendVerificationEmail();
  }, []);

  const refreshUser = useCallback(async () => {
    const updatedUser = await reloadCurrentUser();
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const hasRole = useCallback(
    (...roles) => {
      if (!user?.role) return false;

      return roles.includes(user.role);
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      initializing,
      loading: initializing, // Add support for old loading state
      isAuthenticated: Boolean(user),
      login,
      loginGoogle,
      register,
      logout,
      resendConfirmation,
      refreshUser,
      hasRole,
    }),
    [
      user,
      initializing,
      login,
      loginGoogle,
      register,
      logout,
      resendConfirmation,
      refreshUser,
      hasRole,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
