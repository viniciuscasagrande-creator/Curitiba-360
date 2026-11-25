import React from 'react';
import { DollarSign, Building2, TrendingDown } from 'lucide-react';

export default function EventCostsTable({ custos = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-red-600" /> Custos Operacionais & Contratos de Produção
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[10px]">
          {custos.length} despesas registradas
        </span>
      </div>

      <div className="space-y-3">
        {custos.map((cst) => (
          <div key={cst.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-extrabold text-slate-900 text-xs">{cst.categoria}</span>
              <div className="text-[10px] text-slate-500">Fornecedor: <b>{cst.fornecedor}</b></div>
            </div>

            <div className="text-right">
              <div className="font-extrabold text-red-700 text-xs">R$ {cst.valor?.toFixed(2)}</div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                cst.status === 'pago' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {cst.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
