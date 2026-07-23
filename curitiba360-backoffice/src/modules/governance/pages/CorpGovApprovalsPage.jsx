import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckSquare } from "lucide-react";

export default function CorpGovApprovalsPage() {
  const { data, loading } = useGovernanceDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando aprovações...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fluxo de Aprovações</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe as solicitações pendentes de assinatura eletrônica e autorização executiva.
          </p>
        </div>

        {/* Approvals list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <CheckSquare size={18} className="text-purple-755 font-bold" /> Solicitações Pendentes
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.approvals.map(app => (
              <div key={app.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{app.title}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {app.id} | Solicitante: {app.requester}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 h-7 text-[10px] font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg cursor-pointer transition border-none">
                    Aprovar
                  </button>
                  <button className="px-3 h-7 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition border-none">
                    Rejeitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
