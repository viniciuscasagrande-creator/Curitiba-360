import React from 'react';
import { Sparkles } from 'lucide-react';

export default function BrandActivationTracker({ ativacoes = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Monitor de Ativações de Marca & ROI do Patrocinador
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Métricas de Impacto</span>
      </div>

      <div className="space-y-2">
        {ativacoes.map((act) => (
          <div key={act.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>Marca: {act.marca}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                ROI Atribuído: {act.roiEstimado}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Tipo: {act.tipo}</div>
            <div className="text-[10px] font-mono text-purple-800 font-bold">Público alcançado: {act.publicoAlcancado.toLocaleString()} pessoas • Leads gerados: {act.leadsGerados}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
