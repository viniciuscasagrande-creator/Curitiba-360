import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAIChat } from "../hooks/useAIChat";
import { Sparkles, ShieldAlert, AlertTriangle } from "lucide-react";

export default function InsightsPage() {
  const { insights, anomalies, frauds } = useAIChat();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Central de Insights & Alertas de Risco</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Veja detecções automáticas de fraudes, anomalias de transações e sugestões de otimização de funil de vendas.</p>
        </div>

        {/* Anomalies and frauds */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Anomalias */}
          <div className="p-6 border border-slate-200 bg-white rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 text-orange-600">
              <AlertTriangle size={18} />
              Anomalias Operacionais
            </h3>
            <div className="mt-4 space-y-3">
              {anomalies.map((an) => (
                <div key={an.id} className="p-4 border border-orange-200 bg-orange-50/50 rounded-2xl">
                  <h4 className="font-bold my-0 text-orange-850">{an.title}</h4>
                  <p className="text-xs mt-1 my-0 text-slate-707">{an.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fraudes */}
          <div className="p-6 border border-slate-200 bg-white rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 text-red-600">
              <ShieldAlert size={18} />
              Alertas de Risco de Fraude
            </h3>
            <div className="mt-4 space-y-3">
              {frauds.map((fr) => (
                <div key={fr.id} className="p-4 border border-red-200 bg-red-50/50 rounded-2xl">
                  <h4 className="font-bold my-0 text-red-850">Risco: {fr.risk.toUpperCase()} • Score: {fr.score}</h4>
                  <p className="text-xs mt-1 my-0 text-slate-707">{fr.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
