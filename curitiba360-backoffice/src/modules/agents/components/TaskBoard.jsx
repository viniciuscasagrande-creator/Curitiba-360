import React from 'react';
import { CheckSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TaskBoard({ tasks = [], onMoveTask }) {
  const columns = [
    { key: 'a_fazer', title: 'A Fazer 📋', bg: 'bg-slate-100/70', border: 'border-slate-200' },
    { key: 'em_andamento', title: 'Em Andamento ⏳', bg: 'bg-amber-50/70', border: 'border-amber-200' },
    { key: 'concluido', title: 'Concluído ✅', bg: 'bg-emerald-50/70', border: 'border-emerald-200' }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-purple-600" /> Quadro Kanban de Tarefas Comerciais
        </h3>
        <p className="text-[11px] text-slate-500 font-medium">Gestão rápida de atividades e follow-up de clientes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);

          return (
            <div key={col.key} className={`p-3 rounded-xl border ${col.bg} ${col.border} space-y-2`}>
              <div className="font-bold text-slate-800 text-[11px] flex items-center justify-between">
                <span>{col.title}</span>
                <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-extrabold shadow-2xs text-[10px]">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-2">
                {colTasks.map((t) => (
                  <div key={t.id} className="p-3 bg-white rounded-lg shadow-2xs border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 leading-tight">{t.titulo}</div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        t.prioridade === 'alta' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.prioridade.toUpperCase()}
                      </span>

                      {col.key !== 'concluido' && (
                        <button
                          onClick={() => onMoveTask && onMoveTask(t.id, col.key === 'a_fazer' ? 'em_andamento' : 'concluido')}
                          className="text-[10px] text-purple-600 font-bold hover:underline"
                        >
                          Avançar →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
