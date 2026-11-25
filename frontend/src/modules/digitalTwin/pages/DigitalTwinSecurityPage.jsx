import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDigitalTwin } from "../hooks/useDigitalTwin";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

export default function DigitalTwinSecurityPage() {
  const { summary, loading } = useDigitalTwin();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando segurança urbana...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/digital-twin" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Segurança Urbana & Defesa Civil</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o mapa de calor de ocorrências ativas, contagem de alertas de incidentes na malha municipal e integração de câmeras.
          </p>
        </div>

        {/* Security stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Shield size={18} className="text-purple-755 font-bold" /> Incidentes Sob Monitoramento
          </h3>

          <div className="divide-y divide-slate-100 font-sans">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Ocorrências Ativas</strong>
                <span className="text-[10px] text-slate-505 block">Chamados sob triagem na Central da Guarda Municipal.</span>
              </div>
              <strong className="text-purple-700 text-sm font-mono">{summary.activeOccurrences} Ocorrências</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Alertas de Pânico / Perigo Crítico</strong>
                <span className="text-[10px] text-slate-505 block">Alertas imediatos acionados por totens de segurança municipais.</span>
              </div>
              <strong className="text-emerald-700 text-sm font-mono">{summary.securityAlertsCount} Alertas</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
