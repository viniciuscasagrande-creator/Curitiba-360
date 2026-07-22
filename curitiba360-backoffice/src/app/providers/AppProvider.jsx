import React from "react";
import { AuthProvider } from "../../modules/auth/contexts/AuthContext";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
