import React from 'react';
import { Clock, CheckCircle2, Play, AlertCircle } from 'lucide-react';

export default function ProductionTimeline({ timeline = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-600" /> Cronograma de Produção & Line-up
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {timeline.length} marcos temporais
        </span>
      </div>

      <div className="space-y-3">
        {timeline.map((tm) => (
          <div key={tm.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 text-white rounded-lg font-mono font-bold text-xs min-w-[50px] text-center">
                {tm.horario}
              </div>
              <div>
                <div className="font-extrabold text-slate-900 text-xs">{tm.tarefa}</div>
                <div className="text-[10px] text-slate-400 font-medium">Responsável: {tm.responsavel}</div>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded font-bold text-[10px] ${
              tm.status === 'concluido' ? 'bg-emerald-100 text-emerald-800' :
              tm.status === 'em_andamento' ? 'bg-purple-100 text-purple-800 animate-pulse' :
              'bg-slate-200 text-slate-600'
            }`}>
              {tm.status === 'concluido' ? '✓ Concluído' : tm.status === 'em_andamento' ? '▶ Em Andamento' : '⏳ Pendente'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
