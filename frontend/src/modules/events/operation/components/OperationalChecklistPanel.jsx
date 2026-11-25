import React from 'react';
import { ShieldCheck, CheckSquare, Square } from 'lucide-react';

export default function OperationalChecklistPanel({ checklist = [], onToggleCheck }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-600" /> Checklist Operacional & Vistoria de Segurança
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
          100% Vistoriado
        </span>
      </div>

      <div className="space-y-2">
        {checklist.map((chk) => (
          <div
            key={chk.id}
            onClick={() => onToggleCheck && onToggleCheck(chk.id)}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 font-bold ${
              chk.ok ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            {chk.ok ? (
              <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
            )}
            <span>{chk.item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
