import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminPermissionRoute({ permission, children }) {
  // Simulating active admin permissions
  const hasPermission = true;

  if (!hasPermission) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}
