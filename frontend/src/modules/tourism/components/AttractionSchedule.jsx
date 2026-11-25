import React from 'react';
import { Clock, Calendar } from 'lucide-react';

export function AttractionSchedule({ openingHours }) {
  const defaultHours = [
    { day: 'Segunda-feira', hours: 'Fechado para manutenção' },
    { day: 'Terça-feira a Domingo', hours: '06:00 às 19:30' },
    { day: 'Feriados', hours: '06:00 às 19:30' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
        <Clock size={18} className="text-amber-400" />
        Horário de Funcionamento
      </h3>

      <div className="space-y-2 text-xs">
        {defaultHours.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="font-semibold text-slate-300">{item.day}</span>
            <span className="text-amber-400 font-medium">{item.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AttractionSchedule;
