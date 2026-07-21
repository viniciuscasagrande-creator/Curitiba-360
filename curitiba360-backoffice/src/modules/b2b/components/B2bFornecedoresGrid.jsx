import React from 'react';
import { Store, CheckCircle2 } from 'lucide-react';

export default function B2bFornecedoresGrid({ fornecedores = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Store className="w-3.5 h-3.5 text-purple-600" /> Catálogo de Fornecedores B2B Verificados
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{fornecedores.length} empresas</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {fornecedores.map((f) => (
          <div key={f.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{f.empresa}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {f.avaliacao}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">{f.categoria}</div>
            <div className="text-[9px] text-slate-400 font-mono">Região: {f.regiao}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
