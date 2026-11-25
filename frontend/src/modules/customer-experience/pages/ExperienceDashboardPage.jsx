import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useExperienceDashboard } from "../hooks/useExperienceDashboard";
import { Link } from "react-router-dom";
import { Users, AlertTriangle, MessageSquare, Heart, Award, ArrowRight, Activity, Percent, Compass, MessageCircle } from "lucide-react";

export default function ExperienceDashboardPage() {
  const { summary, alerts, loading } = useExperienceDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando central de experiência...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Experiência & Omnichannel</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Unificação do perfil do visitante (360º), caixa de entrada omnichannel WhatsApp/Web, NPS, réguas de fidelidade e campanhas personalizadas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-455 block font-bold uppercase">Índice NPS:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
              {summary.nps} (Excelente)
            </span>
          </div>
        </div>

        {/* Alerts warnings */}
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
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Visitantes Ativos</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeCustomers.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-650 font-bold block">Taxa de retorno: {summary.returningCustomerRate}%</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Atendimento ao Vivo</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.openConversations} Conversas</span>
            <span className="text-[10px] text-slate-455 block">Tempo de resposta: {summary.averageFirstResponseMinutes} minutos</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">NPS & Satisfação</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.csat}% CSAT</span>
            <span className="text-[10px] text-slate-455 block">Lifetime Value médio: R$ {summary.averageLifetimeValue.toLocaleString()}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Fidelidade & Cupons</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.loyaltyMembers.toLocaleString()} Membros</span>
            <span className="text-[10px] text-emerald-650 font-bold block">Cupons no mês: {summary.couponsRedeemedThisMonth.toLocaleString()}</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4 text-xs">
          <h3 className="text-lg font-bold text-slate-900 my-0">Orquestrações de Relacionamento</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/experience/customers" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Users className="text-emerald-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Perfil 360º do Visitante</h4>
                <p className="text-xs text-slate-505 mt-1">Veja canais preferidos, preferências de consumo, tags e riscos de churn.</p>
              </div>
            </Link>

            <Link to="/admin/experience/inbox" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <MessageSquare className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Caixa de Entrada Omnichannel</h4>
                <p className="text-xs text-slate-505 mt-1">Centralize chats do WhatsApp/Web com análise de sentimentos e prioridade.</p>
              </div>
            </Link>

            <Link to="/admin/experience/journeys" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Compass className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Jornada Turística</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe etapas de descoberta, planejamento de roteiro, compra e fidelização.</p>
              </div>
            </Link>

            <Link to="/admin/experience/campaigns" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Percent className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Campanhas & Segmentos</h4>
                <p className="text-xs text-slate-505 mt-1">Crie réguas de marketing, carrinho abandonado e avisos aos turistas.</p>
              </div>
            </Link>

            <Link to="/admin/experience/loyalty" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Award className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Fidelidade & Cashback</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie saldos de pontos de fidelidade emitidos, cashback e cupons.</p>
              </div>
            </Link>

            <Link to="/admin/experience/nps" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Heart className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Pesquisas & NPS</h4>
                <p className="text-xs text-slate-505 mt-1">Modere avaliações de pontos turísticos, formulários de satisfação e NPS.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
