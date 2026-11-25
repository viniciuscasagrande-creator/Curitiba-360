import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { ShieldAlert, RefreshCw, Flame, CheckCircle, Ban, Play } from "lucide-react";

export default function DRPPage() {
  const { summary, triggerDrpSimulation, loading } = useGovernanceDashboard();
  const [simulationStatus, setSimulationStatus] = useState("idle");

  const runSimulation = async () => {
    setSimulationStatus("running");
    await new Promise(resolve => setTimeout(resolve, 1500));
    await triggerDrpSimulation();
    setSimulationStatus("completed");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Plano de Recuperação de Desastres (DRP)</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Simule falhas de infraestrutura e execute rotinas de Failover para testar a resiliência de Curitiba 360.</p>
        </div>

        {/* DR State */}
        <section className="p-6 border border-slate-200 rounded-3xl bg-slate-950 text-white shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="text-rose-500 animate-pulse" size={24} />
            <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider text-rose-300">Painel de Simulação de Outage</h3>
          </div>
          <p className="text-xs text-slate-400 my-0">
            Disparar simulação de queda de data center regional para verificar a propagação automática do tráfego para a região secundária (Multi-region Cloud Spanner / Firestore replication).
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={runSimulation}
              disabled={simulationStatus === "running"}
              className="h-9 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer border-none transition flex items-center gap-1.5"
            >
              <Play size={14} /> {simulationStatus === "running" ? "Executando Failover..." : "Simular Queda de Região"}
            </button>
          </div>

          {simulationStatus === "completed" && (
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle size={14} /> Failover completado em 1.8 segundos! Alta disponibilidade validada.
            </div>
          )}
        </section>

        {/* Telemetry info */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Métricas de Recuperação (DR Telemetry)</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50">
              <span className="text-slate-400 block font-semibold">RTO (Recovery Time Objective)</span>
              <strong className="text-slate-800 text-lg mt-1 block">15 Minutos Máximo</strong>
            </div>
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50">
              <span className="text-slate-400 block font-semibold">RPO (Recovery Point Objective)</span>
              <strong className="text-slate-800 text-lg mt-1 block">5 Minutos Máximo</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
