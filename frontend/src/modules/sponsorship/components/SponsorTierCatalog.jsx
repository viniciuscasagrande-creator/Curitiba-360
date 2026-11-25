import React from 'react';
import { Award, DollarSign } from 'lucide-react';

export default function SponsorTierCatalog({ cotas = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-purple-600" /> Catálogo de Cotas & Naming Rights
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Inventário Comercial</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {cotas.map((c) => (
          <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{c.nome}</span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[9px]">
                {c.categoria}
              </span>
            </div>
            <div className="text-base font-extrabold text-purple-950 font-mono">
              R$ {c.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">{c.entregaveis}</div>
            <div className="text-[9px] font-bold text-emerald-700 pt-1 border-t border-slate-200/60">{c.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
