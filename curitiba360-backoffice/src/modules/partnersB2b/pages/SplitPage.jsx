import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnersB2b } from "../hooks/usePartnersB2b";
import { Link } from "react-router-dom";
import { ArrowLeft, Landmark } from "lucide-react";

export default function SplitPage() {
  const { kpis, loading } = usePartnersB2b();

  if (loading || !kpis) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando regras de split...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/partners-b2b" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Split Financeiro & Repasses</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Configure e audite a divisão automática de pagamentos nas compras de pacotes e combos turísticos integrados.
          </p>
        </div>

        {/* Split info */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Landmark size={18} className="text-purple-755 font-bold" /> Transações Pendentes de Repasse
          </h3>

          <div className="p-4 bg-purple-50 rounded-2xl flex justify-between items-center text-sans font-sans border border-purple-100">
            <div>
              <strong className="text-slate-900 text-xs block">Repasses Pendentes de Liquidação</strong>
              <span className="text-[10px] text-slate-505 block">Transações processadas pelo gateway com regras de divisão ativas.</span>
            </div>
            <strong className="text-purple-700 text-sm font-mono">{kpis.pendingSplitsCount} Splits</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
