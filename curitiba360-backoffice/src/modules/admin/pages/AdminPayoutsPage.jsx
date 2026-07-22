import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useAdminDashboard } from "../hooks/useAdminDashboard";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));
}

export default function AdminPayoutsPage() {
  const { pendingPayouts } = useAdminDashboard();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Administração Financeira e Repasses</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-655 my-0">Acompanhe solicitações de repasse dos parceiros comerciais, auditorias de saldos e controle de split de taxas.</p>
          {pendingPayouts.map(p => (
            <div key={p.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 my-0">{p.partnerName} ({p.code})</h4>
                <p className="text-xs text-slate-505 my-0 mt-1">Solicitado em: {p.requestedAt} • Nível de Risco: {p.riskLevel.toUpperCase()}</p>
              </div>
              <span className="text-sm font-bold text-slate-950">{formatCurrency(p.amount)}</span>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
