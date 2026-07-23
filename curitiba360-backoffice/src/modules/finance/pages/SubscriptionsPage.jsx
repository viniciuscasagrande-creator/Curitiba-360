import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useFinanceDashboard } from "../hooks/useFinanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Activity } from "lucide-react";

export default function SubscriptionsPage() {
  const { subscriptions, loading } = useFinanceDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando assinaturas...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/finance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Cobranças Recorrentes & SaaS</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o faturamento recorrente mensal ou anual dos planos integrados de parceiros do marketplace.
          </p>
        </div>

        {/* Subscriptions list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Activity size={18} className="text-purple-750" /> Assinaturas Ativas
          </h3>

          <div className="divide-y divide-slate-100">
            {subscriptions.map(sub => (
              <div key={sub.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs font-sans">Cliente: {sub.customerId} (Plano: {sub.planId})</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                      {sub.billingCycle}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455 text-[9px]">
                    <span>Período Vigência: {sub.currentPeriodStart} a {sub.currentPeriodEnd}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <strong className="text-sm font-bold text-slate-700 font-mono">
                    R$ {sub.amount.toFixed(2)}/mês
                  </strong>
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase">
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
