import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { ROUTES } from "../routes/routePaths";

export function AuthGuard() {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="ml-3 font-medium">Carregando...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={ROUTES.public.login}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}
