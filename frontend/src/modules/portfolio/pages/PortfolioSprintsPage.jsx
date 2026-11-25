import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function PortfolioSprintsPage() {
  const { data, loading } = usePartnerDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando sprints...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Sprints & Velocidade</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o ritmo de entrega (Velocity), capacidade das squads e burndown das sprints ativas.
          </p>
        </div>

        {/* Sprint status */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <RefreshCw size={18} className="text-purple-755 font-bold" /> Sprint Ativa: Sprint 14
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Meta da Sprint: Entregar MVP do split financeiro</strong>
              <span className="text-[10px] text-slate-505 block">Duração: 14 dias | Capacidade Alocada: {data.kpis.teamCapacityPct}% | Velocidade Planejada: {data.kpis.averageVelocity} SP</span>
            </div>
            <strong className="text-purple-700 text-xs uppercase font-mono">Em Andamento</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
