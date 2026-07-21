import React from 'react';
import { Building2, Globe, ShieldCheck } from 'lucide-react';

export default function TenantSelectorHeader({ activeTenant = {}, organizacoes = [], onSwitchTenant }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-600 rounded-lg text-white font-bold">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-xs">{activeTenant.nome}</h3>
            <div className="text-[10px] text-purple-300 font-mono flex items-center gap-1">
              <Globe className="w-3 h-3 text-purple-400" /> {activeTenant.dominio}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-purple-900 text-purple-200 font-bold text-[10px] border border-purple-700 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Plano {activeTenant.plano}
          </span>

          <select
            value={activeTenant.id}
            onChange={(e) => onSwitchTenant && onSwitchTenant(e.target.value)}
            className="p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-bold text-[10px]"
          >
            {organizacoes.map((org) => (
              <option key={org.id} value={org.id}>
                {org.nome} ({org.plano})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
