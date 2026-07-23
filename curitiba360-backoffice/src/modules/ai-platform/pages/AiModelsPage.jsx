import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAiDashboard } from "../hooks/useAiDashboard";
import { Link } from "react-router-dom";
import { Cpu, ArrowLeft, RefreshCw } from "lucide-react";

export default function AiModelsPage() {
  const { models, loading } = useAiDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando roteadores de modelo...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/ai" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Roteamento de Modelos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Configure prioridades de fallback automático e custos estimados de tokens de entrada e saída por milhão de tokens processados.
          </p>
        </div>

        {/* Models list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Modelos Disponíveis no Gateway</h3>
          <div className="divide-y divide-slate-100">
            {models.map(mod => (
              <div key={mod.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-sm">{mod.modelName}</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                      {mod.provider}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455 text-[10px] font-mono">
                    <span>Custo Input/1M: R$ {mod.inputCost.toFixed(2)}</span>
                    <span>•</span>
                    <span>Custo Output/1M: R$ {mod.outputCost.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-slate-400 font-bold font-mono">Prioridade Rota: #{mod.priority}</span>
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase">
                    online
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
