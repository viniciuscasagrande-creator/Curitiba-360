import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { FullPageLoader } from "../../components/feedback/FullPageLoader";
import { useAuth } from "../../modules/auth/hooks/useAuth";

export default function PrivateRoute() {
  const location = useLocation();

  const {
    isAuthenticated,
    initializing,
  } = useAuth();

  if (initializing) {
    return (
      <FullPageLoader label="Verificando acesso..." />
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

  return <Outlet />;
}
