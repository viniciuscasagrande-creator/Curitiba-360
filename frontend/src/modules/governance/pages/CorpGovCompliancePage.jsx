import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

export default function CorpGovCompliancePage() {
  const { data, loading } = useGovernanceDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando compliance...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Compliance & Conformidade</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o status das obrigações regulatórias, compliance do canal de denúncias e due diligence.
          </p>
        </div>

        {/* Obligations list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Shield size={18} className="text-purple-755 font-bold" /> Obrigações Ativas
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.obligations.map(ob => (
              <div key={ob.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{ob.title}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {ob.id} | Prazo limite: {ob.dueDate}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${ob.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                  {ob.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
