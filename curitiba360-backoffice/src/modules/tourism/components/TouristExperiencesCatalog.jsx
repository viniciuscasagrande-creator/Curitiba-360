import React from 'react';
import { Compass, Clock, MapPin } from 'lucide-react';

export default function TouristExperiencesCatalog({ experiences = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-purple-600" /> Catálogo de Experiências Turísticas & Culturais
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{experiences.length} atrações</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{exp.nome}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                R$ {exp.preco.toFixed(2)}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Duração: {exp.duracao} • Disponibilidade: {exp.disponibilidade}</div>
            <div className="text-[9px] text-purple-900 font-mono font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-purple-600" /> {exp.local}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
