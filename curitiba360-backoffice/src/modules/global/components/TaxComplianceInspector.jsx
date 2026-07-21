import React from 'react';
import { Landmark, ShieldCheck } from 'lucide-react';

export default function TaxComplianceInspector({ regras = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Landmark className="w-3.5 h-3.5 text-purple-600" /> Tributação Internacional (VAT, Sales Tax & ISS)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Regras por País</span>
      </div>

      <div className="space-y-2">
        {regras.map((r, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{r.pais} ({r.imposto})</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                Alíquota: {r.aliquota}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Classificação Fiscal: {r.tipo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
