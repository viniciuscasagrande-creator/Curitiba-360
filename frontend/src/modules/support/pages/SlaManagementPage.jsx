import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSupportDashboard } from "../hooks/useSupportDashboard";
import { Clock, ShieldAlert } from "lucide-react";

export default function SlaManagementPage() {
  const { slas, loading } = useSupportDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando metas de SLA...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Metas de SLA & Escalonamento</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe os tempos limites de primeira resposta e resolução acordados com parceiros comerciais e clientes finais.
          </p>
        </div>

        {/* SLA list table */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Políticas de Atendimento</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {slas.map(sla => (
              <div key={sla.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 text-sm block">Prioridade {sla.name}</strong>
                  <span className="text-[10px] text-slate-450 mt-0.5">Nível de criticidade associado aos chamados.</span>
                </div>
                <div className="flex gap-6 text-right font-medium">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Resposta</span>
                    <strong className="text-purple-750 font-bold">{sla.firstResponseMinutes} min</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Resolução</span>
                    <strong className="text-slate-800 font-bold">{sla.resolutionMinutes} min</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Escalation details */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4 text-xs">
          <h3 className="text-sm font-bold my-0 uppercase tracking-wider text-slate-400">Fluxo de Escalonamento Operacional</h3>
          <div className="grid gap-4 md:grid-cols-4 font-semibold text-center text-slate-300">
            <div className="p-3 border border-slate-800 rounded-xl bg-slate-850">
              <span className="block text-[10px] text-slate-500">Nível 1</span>
              Atendimento IA
            </div>
            <div className="p-3 border border-slate-800 rounded-xl bg-slate-850">
              <span className="block text-[10px] text-slate-500">Nível 2</span>
              Agente Humano
            </div>
            <div className="p-3 border border-slate-800 rounded-xl bg-slate-850">
              <span className="block text-[10px] text-slate-500">Nível 3</span>
              Especialista Financeiro/TI
            </div>
            <div className="p-3 border border-slate-800 rounded-xl bg-slate-850">
              <span className="block text-[10px] text-slate-500">Nível 4</span>
              Devs / Diretoria
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
