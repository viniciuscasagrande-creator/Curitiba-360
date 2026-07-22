import React from "react";
import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { FullPageLoader } from "../../components/feedback/FullPageLoader";
import { useAuth } from "../../modules/auth/hooks/useAuth";

export default function RoleRoute({
  allowedRoles = [],
  roles = [],
}) {
  const {
    isAuthenticated,
    initializing,
    user,
  } = useAuth();

  const finalRoles = allowedRoles.length > 0 ? allowedRoles : roles;

  if (initializing) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    finalRoles.length > 0 &&
    !finalRoles.includes(user?.role)
  ) {
    return (
      <Navigate
        to="/acesso-negado"
        replace
      />
    );
  }

  return <Outlet />;
}
