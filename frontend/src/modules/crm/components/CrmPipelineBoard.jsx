import React from 'react';
import { Target, DollarSign, UserCheck } from 'lucide-react';

export default function CrmPipelineBoard({ leads = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-purple-600" /> Funil Comercial (Pipeline de Vendas CRM 360)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{leads.length} oportunidades em andamento</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {leads.map((l) => (
          <div key={l.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{l.cliente}</span>
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
                {l.etapa}
              </span>
            </div>
            <div className="text-sm font-extrabold text-purple-950 font-mono">
              R$ {l.valorEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Probabilidade: {l.probabilidade} • Responsável: {l.responsavel}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
