import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useExperienceDashboard } from "../hooks/useExperienceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, DollarSign } from "lucide-react";

export default function CashbackPage() {
  const { summary, loading } = useExperienceDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados de cashback...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Programa de Cashback do Visitante</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Configure e audite os saldos acumulados e as regras de resgate de cashback de Curitiba.
          </p>
        </div>

        {/* Cashback rules metrics */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <DollarSign size={18} className="text-purple-755" /> Saldo & Ajustes
          </h3>

          <div className="grid gap-6 md:grid-cols-2 font-mono text-[10px]">
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-slate-400 font-bold uppercase font-sans">Cashback Disponível</span>
              <span className="text-2xl font-bold block text-slate-900">R$ {summary.cashbackAvailable.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-slate-400 font-bold uppercase font-sans">Regra de Liberação</span>
              <span className="text-2xl font-bold block text-slate-900">7 dias</span>
              <span className="text-[9px] text-slate-505 font-sans">Prazo de carência após a compra do ingresso</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
