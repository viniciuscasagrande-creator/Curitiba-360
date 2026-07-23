import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMarketplace } from "../hooks/useMarketplace";
import { DollarSign, Check } from "lucide-react";

export default function ExtensionBillingPage() {
  const { data, loading } = useMarketplace();

  if (loading || !data || !data.summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados de faturamento...
        </div>
      </AdminLayout>
    );
  }

  const { summary, payouts } = data;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Faturamento & Repasses</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o faturamento mensal gerado por plugins parceiros e configure repasses automáticos do split de receita.
          </p>
        </div>

        {/* Revenue split stats */}
        <section className="grid gap-6 md:grid-cols-3 text-xs">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Faturamento Mensal</span>
            <strong className="text-xl font-extrabold text-slate-900 block">R$ {summary.monthlyRevenue.toLocaleString()}</strong>
            <span className="text-[10px] text-slate-400 block">Faturamento acumulado global</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Repasses Pendentes</span>
            <strong className="text-xl font-extrabold text-amber-600 block">R$ {summary.pendingPayouts.toLocaleString()}</strong>
            <span className="text-[10px] text-slate-400 block">Processamento dia 05</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1 bg-slate-900 text-white border-slate-800">
            <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Split de Comissão</span>
            <strong className="text-xl font-extrabold block text-white mt-1">75% Dev / 25% Plataforma</strong>
            <span className="text-[10px] text-slate-450 block">Retido na fonte da assinatura</span>
          </div>
        </section>

        {/* Transations list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Histórico de Repasses (Desenvolvedores)</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {payouts.map(pay => (
              <div key={pay.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 text-sm block">ID do Repasse: {pay.id}</strong>
                  <span className="text-[10px] text-slate-400">Dev: {pay.developerId} | Data: {new Date(pay.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-right">
                  <strong className="text-slate-900 text-sm block">R$ {pay.amount.toFixed(2)}</strong>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wider font-bold">
                    {pay.status}
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
