import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, BarChart3, Users, QrCode, CreditCard, Award, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from "recharts";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useDashboard } from "../hooks/useDashboard";

export default function ReportsDashboardPage() {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-96 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  if (error || !data) {
    return (
      <PartnerLayout>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 font-semibold">
          {error || "Erro ao carregar dados do dashboard."}
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-7xl space-y-6 select-none text-left">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Analytics & BI
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
              Painel de Indicadores
            </h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Acompanhe a performance de vendas, conversão de funil e ocupação física.
            </p>
          </div>
        </header>

        {/* Top KPIs Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {data.kpis.map((kpi) => (
            <div key={kpi.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{kpi.title}</span>
              <strong className="block text-2xl font-extrabold text-slate-955 mt-1 font-mono">
                {kpi.id.includes("receita") || kpi.id.includes("ticket") ? `R$ ${kpi.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : kpi.value.toLocaleString("pt-BR")}
                {kpi.id.includes("conversao") ? "%" : ""}
              </strong>
              <span className="text-[11px] font-bold text-emerald-600 block mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                +{kpi.variation}% vs anterior
              </span>
            </div>
          ))}
        </section>

        {/* Core Charts Area */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Sales / Revenue Chart */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-955 my-0">Faturamento Acumulado</h3>
              <span className="text-xs font-semibold text-slate-450">Últimos 30 dias</span>
            </div>
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.salesData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip formatter={(v) => `R$ ${v}`} labelClassName="font-bold" />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Funnel Chart */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-955 my-0">Funil de Conversão Comercial</h3>
              <span className="text-xs font-semibold text-slate-450">Visualizações até a Compra</span>
            </div>
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.conversionFunnel} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="stage" type="category" stroke="#94a3b8" width={110} />
                  <Tooltip formatter={(v) => `${v} usuários`} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                    {data.conversionFunnel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? "#10b981" : "#3b82f6"} fillOpacity={1 - index * 0.15} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        {/* Channels Distribution and Occupancy stats */}
        <section className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
          <article className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <p className="text-sm font-semibold text-emerald-400 my-0 uppercase tracking-wider">Canais de Venda</p>
              <h3 className="text-2xl font-bold mt-2 my-0">Distribuição</h3>
              <p className="text-sm text-slate-300 mt-2 my-0">
                Veja de onde estão vindo as conversões e compras dos ingressos de Curitiba 360.
              </p>
            </div>
            <div className="space-y-3 font-semibold text-sm">
              {data.channelDistribution.map((ch) => (
                <div key={ch.name} className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full block" style={{ backgroundColor: ch.color }} />
                    {ch.name}
                  </span>
                  <span>{ch.value}%</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-955 my-0">Capacidade Operacional do Evento</h3>
            <div className="grid gap-4 sm:grid-cols-3 font-semibold text-sm text-slate-700">
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">Emitidos</span>
                <strong className="text-slate-955 text-lg block mt-1">{data.occupancyStats.issued}</strong>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">Checked-In</span>
                <strong className="text-emerald-700 text-lg block mt-1">{data.occupancyStats.checkedIn}</strong>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">Pendentes</span>
                <strong className="text-amber-700 text-lg block mt-1">{data.occupancyStats.pending}</strong>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Taxa de Ocupação Atual</span>
                <span>{data.occupancyStats.rate}%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${data.occupancyStats.rate}%` }}
                />
              </div>
            </div>
          </article>
        </section>
      </div>
    </PartnerLayout>
  );
}
