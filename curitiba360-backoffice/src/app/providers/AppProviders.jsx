import React from "react";
import { AuthProvider } from "../../modules/auth/contexts/AuthContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
