import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { ROUTES } from "../routes/routePaths";

export function PartnerGuard() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="ml-3 font-medium">Carregando...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.public.login} replace />;
  }

  const role = user?.role || profile?.role;
  if (role !== "partner" && role !== "admin") {
    return <Navigate to={ROUTES.app.home} replace />;
  }

  return <Outlet />;
}
