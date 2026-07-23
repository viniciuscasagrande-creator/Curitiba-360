import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAiDashboard } from "../hooks/useAiDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ShieldCheck, ShieldAlert } from "lucide-react";

export default function AiExecutionsPage() {
  const { executions, loading } = useAiDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando histórico de execuções...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Observabilidade & Logs</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore o histórico detalhado de execuções de prompts, tokens processados, custos computacionais estimados e auditoria de segurança.
          </p>
        </div>

        {/* Executions list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <Clock size={18} className="text-purple-750" /> Log de Execuções de IA
          </h3>
          
          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {executions.map(exec => (
              <div key={exec.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs font-sans">ID: {exec.id}</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                      {exec.agentName}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455">
                    <span>Input: {exec.inputTokens} tkn</span>
                    <span>•</span>
                    <span>Output: {exec.outputTokens} tkn</span>
                    <span>•</span>
                    <span>Custo: R$ {exec.estimatedCost.toFixed(4)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] text-slate-400 font-bold">{exec.latencyMs} ms</span>
                  {exec.guardrailResult === "approved" ? (
                    <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase flex items-center gap-0.5">
                      <ShieldCheck size={10} /> Aprovado
                    </span>
                  ) : (
                    <span className="text-[9px] text-red-750 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-bold uppercase flex items-center gap-0.5">
                      <ShieldAlert size={10} /> Bloqueado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
