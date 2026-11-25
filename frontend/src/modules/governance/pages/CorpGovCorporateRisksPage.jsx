import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function CorpGovCorporateRisksPage() {
  const { data, loading } = useGovernanceDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando riscos corporativos...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Riscos Corporativos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerenciamento e controle de riscos regulatórios, operacionais, financeiros e cibernéticos.
          </p>
        </div>

        {/* Risk list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <ShieldAlert size={18} className="text-purple-755 font-bold" /> Matriz de Riscos Corporativos
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.risks.map(risk => (
              <div key={risk.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{risk.title}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {risk.id} | Dono: {risk.owner} | Status: {risk.status}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${risk.level === 'critical' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                  {risk.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
