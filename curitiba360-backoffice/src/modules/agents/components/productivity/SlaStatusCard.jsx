import React from 'react';
import { ShieldCheck, Clock, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export default function SlaStatusCard({ metrics = {} }) {
  const slaPct = metrics.slaPctCumprido || 96.4;
  const responseTime = metrics.tempoMedioPrimeiraRespostaMin || 14;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* SLA % Cumprido */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Taxa de SLA Cumprido</span>
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          {slaPct}%
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">Acima da meta mínima de 90%</p>
      </div>

      {/* Tempo Médio de Resposta */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Tempo Médio Resposta</span>
          <Clock className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          {responseTime} min
        </div>
        <p className="text-[10px] text-blue-600 font-medium">Primeiro atendimento no WhatsApp/E-mail</p>
      </div>

      {/* Ligações do Dia */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Ligações Realizadas Hoje</span>
          <TrendingUp className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-purple-700">
          {metrics.ligacoesRealizadasHoje || 12} chamadas
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Meta diária de 10 chamadas atingida</p>
      </div>

      {/* Tarefas em Alerta */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Tarefas em Atraso (SLA)</span>
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-2xl font-extrabold text-amber-700">
          {metrics.tarefasAtrasadas || 1} pendente
        </div>
        <p className="text-[10px] text-amber-600 font-medium">Necessita atenção imediata</p>
      </div>
    </div>
  );
}
