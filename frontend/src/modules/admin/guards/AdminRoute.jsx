import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  // Simulating active admin authentication
  const isAdmin = true;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
