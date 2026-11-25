import React from "react";
import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { FullPageLoader } from "../../components/feedback/FullPageLoader";
import { useAuth } from "../../modules/auth/hooks/useAuth";

export default function PublicRoute() {
  const {
    user,
    isAuthenticated,
    initializing,
  } = useAuth();

  if (initializing) {
    return <FullPageLoader />;
  }

  if (
    isAuthenticated &&
    user?.emailVerified
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}
