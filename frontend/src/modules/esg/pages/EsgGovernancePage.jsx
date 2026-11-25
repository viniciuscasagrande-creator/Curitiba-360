import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useEsgDashboard } from "../hooks/useEsgDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale, ShieldCheck } from "lucide-react";

export default function EsgGovernancePage() {
  const { summary, loading } = useEsgDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores de governança...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/esg" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Dimensão Governança (G)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe as auditorias de compliance ético, controles de privacidade de dados LGPD e transparência corporativa.
          </p>
        </div>

        {/* Governance list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Scale size={18} className="text-purple-755" /> Transparência & Controles Éticos
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-sm block">Auditoria de Proteção de Dados (LGPD)</strong>
                <span className="text-[10px] text-slate-505 block">Controles de consentimento opt-in/opt-out e retenção de dados pessoais.</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Em conformidade
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-sm block">Código de Conduta & Ouvidoria Canal Ético</strong>
                <span className="text-[10px] text-slate-505 block">Treinamentos aplicados a 100% dos parceiros e comissões da prefeitura.</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                100% Treinados
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
