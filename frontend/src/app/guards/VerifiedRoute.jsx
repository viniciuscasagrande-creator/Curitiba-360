import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { FullPageLoader } from "../../components/feedback/FullPageLoader";
import { useAuth } from "../../modules/auth/hooks/useAuth";

export default function VerifiedRoute() {
  const location = useLocation();

  const {
    user,
    isAuthenticated,
    initializing,
  } = useAuth();

  if (initializing) {
    return (
      <FullPageLoader label="Verificando sua conta..." />
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  if (!user?.emailVerified) {
    return (
      <Navigate
        to="/confirmacao-enviada"
        replace
        state={{
          email: user?.email,
          name:
            user?.name ||
            user?.displayName,
        }}
      />
    );
  }

  return <Outlet />;
}
