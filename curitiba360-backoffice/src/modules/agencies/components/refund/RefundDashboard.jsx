import React from 'react';
import { RefreshCw, Clock, CheckCircle2, XCircle, DollarSign, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react';

export default function RefundDashboard({ summary = {} }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-semibold text-slate-500 block">Solicitações Hoje</span>
        <div className="text-lg font-extrabold text-slate-900">{summary.solicitacoesHoje || 0}</div>
        <p className="text-[9px] text-slate-400">Registradas hoje</p>
      </div>

      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-semibold text-amber-700 block">Pendentes</span>
        <div className="text-lg font-extrabold text-amber-700">{summary.pendentes || 0}</div>
        <p className="text-[9px] text-amber-600">Em análise na fila</p>
      </div>

      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-semibold text-emerald-700 block">Aprovadas</span>
        <div className="text-lg font-extrabold text-emerald-700">{summary.aprovadas || 0}</div>
        <p className="text-[9px] text-emerald-600">Estornadas / Concluídas</p>
      </div>

      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-semibold text-red-700 block">Negadas</span>
        <div className="text-lg font-extrabold text-red-700">{summary.negadas || 0}</div>
        <p className="text-[9px] text-red-500">Indeferidas</p>
      </div>

      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-semibold text-slate-500 block">Tempo Médio</span>
        <div className="text-lg font-extrabold text-slate-900">{summary.tempoMedio || '45m'}</div>
        <p className="text-[9px] text-slate-400">Tempo de resolução</p>
      </div>

      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-semibold text-slate-500 block">Valor Solicitado</span>
        <div className="text-lg font-extrabold text-slate-900">
          R$ {(summary.valorTotalSolicitado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[9px] text-slate-400">Total bruto de pedidos</p>
      </div>

      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-semibold text-emerald-700 block">Reembolsado</span>
        <div className="text-lg font-extrabold text-emerald-700">
          R$ {(summary.valorReembolsadoTotal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[9px] text-emerald-600">Estornos efetuados</p>
      </div>

      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-semibold text-purple-700 block flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-600" /> Score IA Risco
        </span>
        <div className="text-lg font-extrabold text-purple-700">{summary.scoreMedioRisco || 20}/100</div>
        <p className="text-[9px] text-purple-600">Média da fila (Baixo)</p>
      </div>
    </div>
  );
}
