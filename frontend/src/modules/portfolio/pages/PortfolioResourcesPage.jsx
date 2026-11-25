import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

export default function PortfolioResourcesPage() {
  const { data, loading } = usePartnerDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando recursos...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Recursos & Capacidade</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore a alocação de equipes (Squads), horas disponíveis e desvios de capacidade de entrega.
          </p>
        </div>

        {/* Resources list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Users size={18} className="text-purple-755 font-bold" /> Squads Cadastradas
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.resources.map(res => (
              <div key={res.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{res.name}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {res.id} | Membros: {res.membersCount} | Foco: {res.competency}</span>
                </div>
                <strong className="text-purple-700 font-mono text-xs">{res.allocationPct}% Alocada</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
