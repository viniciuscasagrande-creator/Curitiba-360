import React from "react";
import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { usePartner } from "../hooks/usePartner";

export default function PartnerPermissionRoute({
  permission,
}) {
  const {
    partner,
    loading,
  } = usePartner();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 select-none">
        <div className="mx-auto h-72 max-w-5xl animate-pulse rounded-3xl bg-slate-200" />
      </div>
    );
  }

  if (
    !partner ||
    partner.status !== "approved"
  ) {
    return (
      <Navigate
        to="/parceiro"
        replace
      />
    );
  }

  return <Outlet />;
}
