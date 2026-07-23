import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useFinanceDashboard } from "../hooks/useFinanceDashboard";
import { Link } from "react-router-dom";
import { DollarSign, AlertTriangle, TrendingUp, TrendingDown, Clipboard, Settings, ShieldCheck, ArrowRight, Activity, Percent } from "lucide-react";

export default function FinanceDashboardPage() {
  const { summary, alerts, cashFlow, loading } = useFinanceDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando plataforma financeira...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão Financeira & Split</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Orquestração de split de pagamentos PIX/Cartão, repasses automáticos a parceiros, conciliação e DRE gerencial.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-455 block font-bold uppercase">Conciliação Bancária:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
              {summary.reconciliationRate}%
            </span>
          </div>
        </div>

        {/* Financial warnings */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map(al => (
              <div key={al.id} className={`p-4 rounded-2xl flex items-start gap-2.5 text-xs border ${al.severity === "high" ? "bg-red-50 border-red-150 text-red-800" : "bg-amber-50 border-amber-150 text-amber-800"}`}>
                <AlertTriangle className={`shrink-0 mt-0.5 ${al.severity === "high" ? "text-red-650" : "text-amber-600"}`} size={16} />
                <div>
                  <strong className="block text-slate-900 font-bold">{al.title}</strong>
                  <span className="text-[11px] text-slate-600">{al.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Saldo Total Consolidado</span>
            <span className="text-2xl font-extrabold text-slate-900 block">R$ {summary.totalBalance.toLocaleString()}</span>
            <span className="text-[10px] text-slate-455 block">Disponível imediato: R$ {summary.availableBalance.toLocaleString()}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Faturamento (Mês Corrente)</span>
            <span className="text-2xl font-extrabold text-slate-900 block">R$ {summary.monthlyGrossRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-650 font-semibold block">Receita Líquida: R$ {summary.monthlyNetRevenue.toLocaleString()}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Contas a Pagar</span>
            <span className="text-2xl font-extrabold text-red-650 block">R$ {summary.accountsPayable.toLocaleString()}</span>
            <span className="text-[10px] text-slate-455 block">Repasses pendentes: R$ {summary.pendingSettlements.toLocaleString()}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Inadimplência GERAL</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.defaultRate}%</span>
            <span className="text-[10px] text-slate-455 block">Previsão caixa (30d): R$ {summary.forecastThirtyDays.toLocaleString()}</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4 text-xs">
          <h3 className="text-lg font-bold text-slate-900 my-0">Orquestrações Financeiras</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/finance/treasury" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <DollarSign className="text-emerald-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Tesouraria & Ledger</h4>
                <p className="text-xs text-slate-505 mt-1">Veja saldos bloqueados, extratos normalizados e lançamentos contábeis.</p>
              </div>
            </Link>

            <Link to="/admin/finance/payables" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <TrendingDown className="text-red-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Contas a Pagar</h4>
                <p className="text-xs text-slate-505 mt-1">Configure regras de dupla aprovação para despesas acima de R$ 10.000.</p>
              </div>
            </Link>

            <Link to="/admin/finance/receivables" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <TrendingUp className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Contas a Receber</h4>
                <p className="text-xs text-slate-505 mt-1">Monitore faturas de ingressos aprovadas e tarifas líquidas de checkout.</p>
              </div>
            </Link>

            <Link to="/admin/finance/splits" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Percent className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Split de Pagamentos</h4>
                <p className="text-xs text-slate-505 mt-1">Configure repasses automáticos proporcionais entre a plataforma e parceiros.</p>
              </div>
            </Link>

            <Link to="/admin/finance/subscriptions" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Activity className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Cobrança Recorrente</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe planos SaaS de organizadores, retentativas e avisos de dunning.</p>
              </div>
            </Link>

            <Link to="/admin/finance/budgets" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Clipboard className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Orçamentos & Custos</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie limites de gastos de centros de custos e acompanhamento de DRE.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
