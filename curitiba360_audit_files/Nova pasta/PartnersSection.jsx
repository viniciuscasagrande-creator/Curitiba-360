import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';

const partners = [
  { name: 'Prefeitura de Curitiba', type: 'Governo' },
  { name: 'URBS Curitiba', type: 'Mobilidade' },
  { name: 'Viaje Paraná', type: 'Turismo' },
  { name: 'Teatro Guaíra', type: 'Cultura' },
  { name: 'MON - Oscar Niemeyer', type: 'Arte' }
];

export function PartnersSection() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Building2 size={16} className="text-amber-400" />
          Ecossistema Oficial de Parceiros
        </h4>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
          <ShieldCheck size={12} />
          Plataforma Certificada
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-around gap-4 pt-2">
        {partners.map((p, idx) => (
          <div key={idx} className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
            <span className="text-xs font-bold text-slate-200 block">{p.name}</span>
            <span className="text-[10px] text-slate-500">{p.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PartnersSection;
