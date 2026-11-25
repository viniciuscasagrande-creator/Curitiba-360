import React from 'react';
import { Calendar, Clock, CheckCircle2, Phone, Gift, AlertCircle } from 'lucide-react';

export default function AgendaWidget({ agenda = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" /> Agenda do Dia & Compromissos
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
          {agenda.length} agendamentos hoje
        </span>
      </div>

      <div className="space-y-2">
        {agenda.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
              item.status === 'concluido'
                ? 'bg-slate-50 border-slate-200 text-slate-400 line-through opacity-70'
                : 'bg-blue-50/50 border-blue-100 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-blue-700 bg-white px-2 py-1 rounded border border-blue-200">
                {item.hora}
              </span>
              <div>
                <span className="font-bold block text-slate-900">{item.titulo}</span>
                <span className="text-[10px] text-slate-500 capitalize">Tipo: {item.tipo}</span>
              </div>
            </div>

            {item.status === 'concluido' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Clock className="w-4 h-4 text-amber-600" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
