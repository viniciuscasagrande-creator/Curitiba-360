import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export function ReservationCalendar({
  availableDates = [],
  availableTimes = [],
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      {/* Seleção de Data */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <CalendarIcon size={16} className="text-amber-400" />
          Selecione a Data da Visita
        </label>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {availableDates.map((dateStr) => {
            const dateObj = new Date(dateStr + 'T00:00:00');
            const dayNum = dateObj.getDate();
            const weekDay = dateObj.toLocaleDateString('pt-BR', { weekday: 'short' });
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onSelectDate(dateStr)}
                className={`p-3 rounded-xl border text-center shrink-0 min-w-[70px] transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] uppercase block font-semibold">{weekDay}</span>
                <span className="text-lg font-black">{dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Seleção de Horário */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Clock size={16} className="text-amber-400" />
          Selecione o Horário
        </label>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {availableTimes.map((timeStr) => {
            const isSelected = selectedTime === timeStr;
            return (
              <button
                key={timeStr}
                type="button"
                onClick={() => onSelectTime(timeStr)}
                className={`py-2 px-3 rounded-xl border text-center text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {timeStr}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ReservationCalendar;
