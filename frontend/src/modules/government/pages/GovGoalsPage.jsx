import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertTriangle, Play } from "lucide-react";

export default function GovGoalsPage() {
  const { data, loading } = useGovernmentDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando metas...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Metas Governamentais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhamento em tempo real das metas estratégicas pactuadas com o cidadão e órgãos reguladores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.goals.map(goal => (
            <div key={goal.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-400 font-mono">ID: {goal.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                  goal.status === "on_track" ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"
                }`}>
                  {goal.status === "on_track" ? "No Prazo" : "Atenção"}
                </span>
              </div>

              <div>
                <strong className="text-sm font-bold text-slate-900 block leading-tight">{goal.title}</strong>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 font-mono">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Alvo da Meta</span>
                  <strong className="text-sm text-slate-700 block">{goal.targetValue}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Valor Atual</span>
                  <strong className="text-sm text-purple-700 block">{goal.currentValue}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
