import React from 'react';
import { UserCheck, ShieldCheck } from 'lucide-react';

export default function CrmCustomerDetailCard({ customers = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-purple-600" /> Cadastro Unificado & Visão 360 do Cliente
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">LGPD Compliant</span>
      </div>

      <div className="space-y-2">
        {customers.map((c) => (
          <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{c.nome}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                NPS {c.npsScore} ★
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Tipo: {c.tipo} • Último contato: {c.ultimoContato}</div>
            <div className="text-[10px] font-mono text-purple-800 font-bold">Compras Totais: {c.comprasTotais} ingressos • Valor Gasto: R$ {c.valorGastoTotal.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
