import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Award } from "lucide-react";

export default function CorpGovCouncilsPage() {
  const { data, loading } = useGovernanceDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando conselhos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Conselhos Corporativos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Administre a constituição de conselhos e suas respectivas agendas deliberativas.
          </p>
        </div>

        {/* Councils list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Award size={18} className="text-purple-755 font-bold" /> Conselhos Ativos
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.councils.map(c => (
              <div key={c.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{c.name}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {c.id} | Tipo: {c.type} | Membros: {c.membersCount}</span>
                </div>
                <Link to={`/admin/governance/councils/${c.id}`} className="h-7 px-3 font-bold text-[10px] text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg flex items-center justify-center border-none transition hover:no-underline">
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
