import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  Package,
  TrendingUp,
  AlertTriangle,
  Layers,
  Heart,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Activity
} from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { approvePartnerRepository } from "../repositories/adminRepository";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));
}

export default function AdminDashboardPage() {
  const { summary, pendingPartners, pendingPayouts, incidents, loading, error, reload } = useAdminDashboard();

  const handleApprovePartner = async (partnerId) => {
    await approvePartnerRepository(partnerId, "Cadastro validado pela auditoria administrativa.");
    reload();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200" />
      </AdminLayout>
    );
  }

  if (error || !summary) {
    return (
      <AdminLayout>
        <section className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error || "Erro ao carregar dados do painel administrativo."}
        </section>
      </AdminLayout>
    );
  }

  const kpiCards = [
    { label: "Usuários Ativos", value: summary.users.active, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Parceiros Ativos", value: summary.partners.active, icon: Building2, color: "text-emerald-600 bg-emerald-50" },
    { label: "Produtos Publicados", value: summary.products.published, icon: Package, color: "text-purple-600 bg-purple-50" },
    { label: "Volume de Vendas", value: formatCurrency(summary.commerce.grossVolume), icon: TrendingUp, color: "text-indigo-600 bg-indigo-50" },
    { label: "Faturamento Líquido", value: formatCurrency(summary.commerce.netRevenue), icon: Layers, color: "text-teal-600 bg-teal-50" },
    { label: "Repasses Pendentes", value: summary.financial.pendingPayouts, icon: Layers, color: "text-orange-600 bg-orange-50" },
    { label: "Incidentes Ativos", value: summary.platform.activeIncidents, icon: AlertTriangle, color: "text-red-600 bg-red-50" },
    { label: "Uptime do Sistema", value: `${summary.platform.uptime}%`, icon: Activity, color: "text-pink-600 bg-pink-50" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Painel Operacional</h1>
            <p className="mt-2 text-sm text-slate-600 my-0 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              Sessão Administrativa Segura com MFA ativa.
            </p>
          </div>
        </header>

        {/* KPIs Cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map(({ label, value, icon: Icon, color }) => (
            <article
              key={label}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${color}`}>
                <Icon size={21} />
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-500 my-0">
                {label}
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 my-0">
                {value}
              </p>
            </article>
          ))}
        </section>

        {/* Content sections */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Parceiros Pendentes de Aprovação */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 my-0">Parceiros Pendentes</h2>
                <Link
                  to="/admin/parceiros"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 text-decoration-none hover:underline"
                >
                  Ver todos
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {pendingPartners.length === 0 ? (
                  <p className="text-sm text-slate-500 font-semibold my-4">Nenhum parceiro pendente de aprovação.</p>
                ) : (
                  pendingPartners.map((partner) => (
                    <article
                      key={partner.id}
                      className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-slate-900 my-0">{partner.legalName}</p>
                        <p className="text-xs text-slate-505 my-0 mt-0.5">{partner.document} • Risco: {partner.risk.level.toUpperCase()}</p>
                      </div>
                      <button
                        onClick={() => handleApprovePartner(partner.id)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-700 px-4 text-xs font-bold text-white hover:bg-emerald-800 transition cursor-pointer border-none"
                      >
                        <CheckCircle size={14} />
                        Aprovar
                      </button>
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Incidentes de Plataforma */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 my-0">Incidentes Ativos</h2>
            <div className="mt-5 space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="p-4 border border-red-200 bg-red-50/50 rounded-2xl">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle size={18} />
                    <h4 className="font-bold my-0">{incident.title}</h4>
                  </div>
                  <p className="text-xs text-slate-707 my-0 mt-1">{incident.description}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 border border-red-200 px-2.5 py-0.5 rounded-md">
                      SEVERIDADE: {incident.severity.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 border border-orange-200 px-2.5 py-0.5 rounded-md">
                      STATUS: {incident.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
