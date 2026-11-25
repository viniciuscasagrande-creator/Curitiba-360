import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { ROUTES } from "../routes/routePaths";

export function GuestGuard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="ml-3 font-medium">Carregando...</span>
      </div>
    );
  }

  if (user) {
    // Redireciona com base no papel do usuário
    const role = user.role;
    if (role === "admin") {
      return <Navigate to={ROUTES.admin.dashboard} replace />;
    }
    return <Navigate to={ROUTES.app.home} replace />;
  }

  return <Outlet />;
}
