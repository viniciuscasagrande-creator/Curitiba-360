import React from "react";
import { AuthProvider } from "../../modules/auth/contexts/AuthContext";
import { ProfilePreferenceEffects } from "../../modules/profile";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProfilePreferenceEffects />
      {children}
    </AuthProvider>
  );
}
