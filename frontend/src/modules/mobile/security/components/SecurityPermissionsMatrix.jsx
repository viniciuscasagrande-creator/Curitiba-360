import React from 'react';
import { Lock, Check, X } from 'lucide-react';

export default function SecurityPermissionsMatrix({ permissoes = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-purple-600" /> Permissões do Usuário (RBAC)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Papel: Produtor Executivo</span>
      </div>

      <div className="space-y-2">
        {permissoes.map((p, idx) => (
          <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
            <span className="font-bold text-slate-800 text-xs">{p.recurso}</span>
            {p.permitido ? (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] flex items-center gap-1">
                <Check className="w-3 h-3" /> PERMITIDO
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[9px] flex items-center gap-1">
                <X className="w-3 h-3" /> NEGADO
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
