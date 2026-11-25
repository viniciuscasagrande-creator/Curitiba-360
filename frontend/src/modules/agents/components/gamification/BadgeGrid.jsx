import React from 'react';
import { Award, Lock, CheckCircle2 } from 'lucide-react';

export default function BadgeGrid({ medalhas = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-600" /> Galeria de Medalhas & Conquistas Desbloqueadas
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {medalhas.filter((m) => m.conquistada).length} / {medalhas.length} Desbloqueadas
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {medalhas.map((med) => (
          <div
            key={med.id}
            className={`p-3.5 rounded-xl border text-center space-y-2 transition-all flex flex-col items-center justify-between ${
              med.conquistada
                ? 'bg-purple-50/60 border-purple-200 text-slate-900 shadow-2xs hover:scale-105 cursor-pointer'
                : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 grayscale'
            }`}
          >
            <div className="text-3xl">{med.icone}</div>
            <div>
              <div className="font-extrabold text-xs leading-tight text-slate-900">{med.titulo}</div>
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">{med.descricao}</p>
            </div>

            {med.conquistada ? (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                ✓ Conquistada
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                <Lock className="w-2.5 h-2.5" /> Bloqueada
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
