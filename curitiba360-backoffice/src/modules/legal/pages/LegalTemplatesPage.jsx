import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useLegalDashboard } from "../hooks/useLegalDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Plus } from "lucide-react";

export default function LegalTemplatesPage() {
  const { templates, loading } = useLegalDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando templates...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/legal" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Modelos de Templates Jurídicos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Padronize acordos de confidencialidade (NDA), regras de termos de consentimento LGPD e locação de espaços.
          </p>
        </div>

        {/* Templates grid list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Templates Disponíveis</h3>
          <div className="divide-y divide-slate-100">
            {templates.map(tpl => (
              <div key={tpl.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                <div className="space-y-1">
                  <strong className="text-slate-900 text-sm block">{tpl.name}</strong>
                  <span className="text-[10px] text-slate-400 block font-mono">Categoria: {tpl.type}</span>
                </div>

                <div className="flex gap-2">
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase shrink-0">
                    ativo
                  </span>
                  <Link
                    to="/admin/legal/contracts/new"
                    className="h-8 px-3 font-bold text-purple-755 hover:text-purple-805 bg-purple-50 hover:bg-purple-100 rounded-xl cursor-pointer border border-purple-100 transition flex items-center justify-center gap-1 hover:no-underline text-xs"
                  >
                    Usar Template
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
