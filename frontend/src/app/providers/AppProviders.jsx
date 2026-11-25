import React from "react";
import { AuthProvider } from "../../providers/AuthProvider";
import { ProfilePreferenceEffects } from "../../modules/profile";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProfilePreferenceEffects />
      {children}
    </AuthProvider>
  );
}
