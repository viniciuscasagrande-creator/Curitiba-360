import React from 'react';
import { Building2, DollarSign } from 'lucide-react';

export default function VendorListPanel({ fornecedores = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Building2 className="w-4 h-4 text-purple-600" /> Fornecedores & Prestadores de Serviços
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {fornecedores.length} empresas contratadas
        </span>
      </div>

      <div className="space-y-3">
        {fornecedores.map((vnd) => (
          <div key={vnd.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-extrabold text-slate-900 text-xs">{vnd.empresa}</span>
              <div className="text-[10px] text-purple-800 font-bold">{vnd.servico}</div>
              <div className="text-[10px] text-slate-400 font-medium">Contato: {vnd.contato}</div>
            </div>

            <div className="text-right">
              <div className="font-extrabold text-emerald-700 text-xs">R$ {vnd.valor?.toFixed(2)}</div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                vnd.status === 'pago' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {vnd.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
