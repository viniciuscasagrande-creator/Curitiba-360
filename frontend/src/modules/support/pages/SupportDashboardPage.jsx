import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSupportDashboard } from "../hooks/useSupportDashboard";
import { Link } from "react-router-dom";
import { LifeBuoy, BookOpen, Clock, Heart, AlertTriangle, MessageSquare } from "lucide-react";

export default function SupportDashboardPage() {
  const { summary, loading } = useSupportDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando central de atendimento...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Central de Suporte & CS</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie canais de atendimento, tickets de suporte, controle de SLAs e saúde dos parceiros.
          </p>
        </div>

        {/* Dashboard Grid KPIs */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Tickets Abertos</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.openTickets}</span>
            <span className="text-[10px] text-slate-400 block">{summary.pendingTickets} aguardando resposta</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">SLA Cumprido</span>
            <span className="text-2xl font-extrabold text-emerald-600 block">{summary.slaCompliantPercent}%</span>
            <span className="text-[10px] text-rose-500 block">{summary.slaViolatedCount} violações detectadas</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Métricas de Satisfação</span>
            <span className="text-2xl font-extrabold text-slate-900 block">NPS {summary.npsScore}</span>
            <span className="text-[10px] text-emerald-650 font-semibold block">CSAT: {summary.csatPercent}%</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Parceiros em Risco</span>
            <span className="text-2xl font-extrabold text-rose-600 block">{summary.riskCustomersCount}</span>
            <span className="text-[10px] text-slate-400 block">Health Score abaixo de 50</span>
          </div>
        </section>

        {/* Shortcut Cards */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Menu de Suporte</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/support/tickets" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <LifeBuoy className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Tickets de Atendimento</h4>
                <p className="text-xs text-slate-500 mt-1">Gerencie a fila de triagem de erros, reembolsos e problemas técnicos.</p>
              </div>
            </Link>

            <Link to="/admin/support/knowledge-base" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <BookOpen className="text-purple-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Base de Conhecimento</h4>
                <p className="text-xs text-slate-505 mt-1">Escreva artigos de autoatendimento contendo tutoriais para parceiros.</p>
              </div>
            </Link>

            <Link to="/admin/support/slas" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Clock className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Políticas de SLA</h4>
                <p className="text-xs text-slate-505 mt-1">Monitore tempos máximos de resposta e resolução por criticidade.</p>
              </div>
            </Link>

            <Link to="/admin/support/customer-success" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Heart className="text-indigo-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Customer Success & Saúde</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe o health score de parceiros comerciais ativos e em onboarding.</p>
              </div>
            </Link>

            <Link to="/admin/support/incidents" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <AlertTriangle className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Incidentes Operacionais</h4>
                <p className="text-xs text-slate-505 mt-1">Registre instabilidades técnicas de Pix e gateway de faturamento.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
