import React from 'react';
import { CheckSquare, Square, AlertCircle, Clock } from 'lucide-react';

export default function StaffTaskCards({ tarefas = [], onToggleTask }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <CheckSquare className="w-3.5 h-3.5 text-purple-600" /> Tarefas Operacionais & Checklist
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{tarefas.length} atividades</span>
      </div>

      <div className="space-y-2">
        {tarefas.map((tsk) => (
          <div
            key={tsk.id}
            onClick={() => onToggleTask && onToggleTask(tsk.id)}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between font-bold ${
              tsk.status === 'concluido'
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 line-through opacity-75'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {tsk.status === 'concluido' ? (
                <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
              )}
              <div>
                <div className="text-[11px] font-extrabold">{tsk.titulo}</div>
                <div className="text-[9px] text-slate-400 font-normal">Setor: {tsk.setor}</div>
              </div>
            </div>

            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
              tsk.prioridade === 'alta' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'
            }`}>
              {tsk.prioridade.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
