import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authService } from "../modules/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.observeAuth(async (authenticatedUser) => {
      try {
        setLoading(true);
        setUser(authenticatedUser);

        if (!authenticatedUser) {
          setProfile(null);
          return;
        }

        const userProfile = await authService.getProfile(authenticatedUser.uid);
        setProfile(userProfile);
      } catch (error) {
        console.error("Erro ao carregar sessão de usuário:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const login = useCallback(async (input) => {
    const res = await authService.login(input);
    setUser(res);
    setProfile(res);
    return res;
  }, []);

  const register = useCallback(async (input) => {
    const res = await authService.register(input);
    setUser(res);
    setProfile(res);
    return res;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const res = await authService.loginWithGoogle();
    setUser(res);
    setProfile(res);
    return res;
  }, []);

  const recoverPassword = useCallback(async (email) => {
    await authService.recoverPassword(email);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setProfile(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      authenticated: Boolean(user),
      login,
      register,
      loginWithGoogle,
      recoverPassword,
      logout
    }),
    [user, profile, loading, login, register, loginWithGoogle, recoverPassword, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
