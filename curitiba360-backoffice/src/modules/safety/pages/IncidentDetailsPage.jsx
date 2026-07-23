import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, User, MessageSquare, Shield, Clock } from "lucide-react";

export default function IncidentDetailsPage() {
  const { incidentId } = useParams();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety/incidents" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar à Lista
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Ficha da Ocorrência</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Log completo do incidente, equipes despachadas, logs de decisões e histórico de atualizações.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Identity */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1.5">
              <Shield size={16} className="text-purple-755" /> Identificação
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Protocolo</span>
                <span className="text-slate-808 font-mono text-[10px] font-bold">{incidentId || "INC-0982"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Título</span>
                <span className="text-slate-808 font-bold">Lotação elevada no setor Norte</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Localização</span>
                <span className="text-slate-808 font-bold">Setor Norte (Arena Central)</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-red-50 text-red-750 border border-red-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                  ALTA PRIORIDADE
                </span>
                <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                  EM ANDAMENTO
                </span>
              </div>
            </div>
          </div>

          {/* Timeline and Updates */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
                <Clock size={18} className="text-purple-755" /> Linha do Tempo & Despacho
              </h3>
              <div className="space-y-4 relative pl-4 border-l border-slate-100 font-mono text-[10px]">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  <strong className="text-slate-850 block font-sans">19:14 — Ocorrência Criada</strong>
                  <span className="text-slate-400 block">Detectada automaticamente por sensor de fluxo na entrada Norte.</span>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-white" />
                  <strong className="text-slate-850 block font-sans">19:18 — Equipe Despachada</strong>
                  <span className="text-slate-400 block">Brigadistas do Bloco A orientados a realizar abertura de saídas secundárias.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
