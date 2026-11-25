import React from 'react';
import { PieChart, ShieldCheck } from 'lucide-react';

export default function ReconciliationApiPanel({ metrics = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <PieChart className="w-3.5 h-3.5 text-purple-600" /> Conciliação Financeira (`/v1/reconciliation`)
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
          {metrics.statusConciliacao}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">Receita Bruta Total</div>
          <div className="text-sm font-extrabold text-slate-900">R$ {metrics.receitaBrutaTotal?.toFixed(2)}</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">Taxas Adquirente Retidas</div>
          <div className="text-sm font-extrabold text-purple-700">R$ {metrics.taxasAdquirenteRetidas?.toFixed(2)}</div>
        </div>

        <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
          <div className="text-[10px] text-emerald-800 font-bold">Saldo para Repasse</div>
          <div className="text-sm font-extrabold text-emerald-700">R$ {metrics.saldoDisponivelRepasse?.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
