import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAiDashboard } from "../hooks/useAiDashboard";
import { Link } from "react-router-dom";
import { Plus, Edit3, ArrowRight } from "lucide-react";

export default function AiAgentsPage() {
  const { agents, loading } = useAiDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando agentes de inteligência artificial...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Agentes Especializados</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Gerencie parâmetros de execução de personas automatizadas do Curitiba 360.
            </p>
          </div>
          <Link
            to="/admin/ai/agents/new"
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1 hover:no-underline"
          >
            <Plus size={14} /> Novo Agente
          </Link>
        </div>

        {/* Agents Grid */}
        <section className="grid gap-6 md:grid-cols-3">
          {agents.map(ag => (
            <div key={ag.id} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                    {ag.type}
                  </span>
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider font-bold">
                    {ag.status}
                  </span>
                </div>
                <strong className="text-slate-900 text-base block">{ag.name}</strong>
                <p className="text-slate-550 leading-relaxed my-0">{ag.description}</p>
              </div>

              <div className="border-t border-slate-50 pt-3 space-y-2">
                <div className="flex justify-between text-[10px] text-slate-450 font-mono">
                  <span>Execuções Hoje:</span>
                  <span className="font-bold text-slate-700">{ag.executionsToday.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-455 font-mono">
                  <span>Taxa Sucesso:</span>
                  <span className="font-bold text-slate-700">{ag.successRate}%</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-455 font-mono">
                  <span>Latência Média:</span>
                  <span className="font-bold text-slate-700">{ag.averageLatencyMs} ms</span>
                </div>
              </div>

              <Link
                to={`/admin/ai/agents/${ag.id}`}
                className="h-8 w-full font-bold text-purple-750 hover:text-purple-805 bg-purple-50 hover:bg-purple-100 rounded-xl cursor-pointer transition flex items-center justify-center gap-1 hover:no-underline text-xs border border-purple-100"
              >
                Configurar Parâmetros <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
