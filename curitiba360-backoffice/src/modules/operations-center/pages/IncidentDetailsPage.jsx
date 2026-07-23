import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOperationsDashboard } from "../hooks/useOperationsDashboard";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, ShieldAlert, CheckSquare } from "lucide-react";

export default function IncidentDetailsPage() {
  const { incidentId } = useParams();
  const { incidents, loading } = useOperationsDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando histórico do incidente...
        </div>
      </AdminLayout>
    );
  }

  const incident = incidents.find(i => i.id === incidentId) || incidents[0];

  if (!incident) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-2">
          <span>Nenhum incidente encontrado.</span>
          <Link to="/admin/operations/incidents" className="text-purple-700 font-bold hover:underline">Voltar</Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-2xl">
        <Link to="/admin/operations/incidents" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar à lista
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">
            {incident.title}
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a linha do tempo de contenção da ocorrência de categoria {incident.category}.
          </p>
        </div>

        <section className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${incident.priority === "p1" || incident.priority === "p2" ? "bg-red-50 text-red-705 border-red-150" : "bg-amber-50 text-amber-705 border-amber-150"}`}>
              Prioridade: {incident.priority.toUpperCase()}
            </span>
            <span className="text-[10px] text-slate-455 font-mono">SLA Restante: {incident.slaRemainingMinutes} min</span>
          </div>

          <div className="space-y-2">
            <strong className="text-slate-800 text-sm block">Relato Detalhado:</strong>
            <p className="text-slate-600 leading-relaxed my-0 text-xs">
              {incident.description || "Nenhum detalhe adicional inserido."}
            </p>
          </div>

          {/* Audit Timeline */}
          <div className="border-t border-slate-50 pt-4 space-y-3">
            <strong className="text-slate-900 text-sm block flex items-center gap-1">
              <Clock size={16} className="text-purple-750" /> Histórico de Resolução
            </strong>

            <div className="relative border-l border-slate-200 ml-2.5 pl-4 space-y-4 text-[11px]">
              <div className="space-y-0.5">
                <strong className="text-slate-805 block">17:15 — Incidente Detectado pelo Sistema</strong>
                <span className="text-slate-500 block">Identificado volume anormal de timeouts na API de check-in.</span>
              </div>
              <div className="space-y-0.5">
                <strong className="text-slate-805 block">17:18 — Alerta Encaminhado à Equipe</strong>
                <span className="text-slate-500 block">Engenheiro responsável iniciou a triagem e investigações.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
              Encaminhar ao War Room
            </button>
            <button className="h-9 px-4 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
              Marcar como Resolvido
            </button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
