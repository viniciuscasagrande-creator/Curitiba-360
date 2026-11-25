import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, FileText } from "lucide-react";

export default function GovHearingsPage() {
  const { data, loading } = useGovernmentDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando audiências...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Audiências Públicas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Agenda oficial de audiências presenciais e virtuais para debate de leis, concessões e projetos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.hearings.map(hearing => (
            <div key={hearing.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-400 font-mono">ID: {hearing.id}</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono text-purple-700 bg-purple-50">
                  Agendada
                </span>
              </div>

              <div>
                <strong className="text-sm font-bold text-slate-900 block leading-tight">{hearing.title}</strong>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1"><Calendar size={12} /> {hearing.date}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {hearing.participants} confirmados</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
