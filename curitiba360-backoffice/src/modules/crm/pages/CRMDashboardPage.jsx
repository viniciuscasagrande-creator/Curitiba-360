import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserPlus,
  RefreshCw,
  Heart,
  Star,
  MessageSquareCode,
  CheckSquare,
  TrendingUp,
  Ticket,
  ArrowRight,
  ShieldCheck,
  Plus
} from "lucide-react";

import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useCustomers } from "../hooks/useCustomers";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));
}

export default function CRMDashboardPage() {
  const { kpis, customers, loading, error } = useCustomers();

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  if (error || !kpis) {
    return (
      <PartnerLayout>
        <section className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error || "Erro ao carregar dados do CRM."}
        </section>
      </PartnerLayout>
    );
  }

  const crmKpis = [
    { label: "Total de Clientes", value: kpis.totalCustomers, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Novos (Este Mês)", value: kpis.newCustomers, icon: UserPlus, color: "text-emerald-600 bg-emerald-50" },
    { label: "Recorrentes", value: kpis.recurringCustomers, icon: RefreshCw, color: "text-purple-600 bg-purple-50" },
    { label: "Score de NPS", value: kpis.nps, icon: Heart, color: "text-pink-600 bg-pink-50" },
    { label: "Avaliação Média", value: `${kpis.averageRating} ★`, icon: Star, color: "text-amber-600 bg-amber-50" },
    { label: "Tickets Abertos", value: kpis.openTickets, icon: MessageSquareCode, color: "text-red-600 bg-red-50" },
    { label: "LTV Médio", value: formatCurrency(kpis.ltv), icon: TrendingUp, color: "text-indigo-600 bg-indigo-50" },
    { label: "Tickets Resolvidos", value: kpis.resolvedTickets, icon: CheckSquare, color: "text-teal-600 bg-teal-50" },
  ];

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-7xl space-y-6 select-none text-left">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Gestão de Relacionamento
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
              Painel CRM & Atendimento
            </h1>
            <p className="mt-2 text-sm text-slate-600 my-0 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              Ambiente em conformidade com a LGPD e políticas de privacidade.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/parceiro/crm/tickets/novo"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800 transition text-decoration-none border-none cursor-pointer"
            >
              <Plus size={17} />
              Novo Ticket
            </Link>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {crmKpis.map(({ label, value, icon: Icon, color }) => (
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
              <p className="mt-2 text-2xl font-bold text-slate-955 my-0">
                {value}
              </p>
            </article>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Listagem de clientes recentes */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-955 my-0">
                Clientes Recentes
              </h2>
              <Link
                to="/parceiro/crm/clientes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 text-decoration-none hover:underline"
              >
                Ver base completa
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {customers.map((c) => (
                <div key={c.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-955 my-0">{c.name}</p>
                    <p className="text-xs text-slate-505 my-0 mt-0.5">{c.email} • {c.city}/{c.state}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200 px-2.5 py-0.5 text-[10px]">
                      SCORE: {c.score}
                    </span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
                      {c.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Atalhos Rápidos CRM */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-955 my-0">
              Atalhos & Relacionamento
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/parceiro/crm/tickets"
                className="p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 text-decoration-none block text-left"
              >
                <h4 className="font-bold text-slate-955 my-0">Suporte & Tickets</h4>
                <p className="text-xs text-slate-505 my-0 mt-1">Gerencie chamados, SLA e conversas de atendimento.</p>
              </Link>

              <Link
                to="/parceiro/crm/oportunidades"
                className="p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 text-decoration-none block text-left"
              >
                <h4 className="font-bold text-slate-955 my-0">Pipeline de Vendas</h4>
                <p className="text-xs text-slate-505 my-0 mt-1">Acompanhe funis e novas oportunidades de vendas.</p>
              </Link>

              <Link
                to="/parceiro/crm/tarefas"
                className="p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 text-decoration-none block text-left"
              >
                <h4 className="font-bold text-slate-955 my-0">Tarefas & SLA</h4>
                <p className="text-xs text-slate-505 my-0 mt-1">Acompanhe compromissos e agendamento de chamadas.</p>
              </Link>

              <Link
                to="/parceiro/crm/segmentos"
                className="p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 text-decoration-none block text-left"
              >
                <h4 className="font-bold text-slate-955 my-0">Segmentação</h4>
                <p className="text-xs text-slate-505 my-0 mt-1">Crie réguas, grupos e filtros de clientes.</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </PartnerLayout>
  );
}
