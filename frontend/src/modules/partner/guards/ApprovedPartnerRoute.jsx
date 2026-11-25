import React from "react";
import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { usePartner } from "../hooks/usePartner";

export default function ApprovedPartnerRoute() {
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

  if (!partner) {
    return (
      <Navigate
        to="/parceiro/cadastro"
        replace
      />
    );
  }

  if (partner.status !== "approved") {
    return (
      <Navigate
        to="/parceiro/onboarding"
        replace
      />
    );
  }

  return <Outlet />;
}
