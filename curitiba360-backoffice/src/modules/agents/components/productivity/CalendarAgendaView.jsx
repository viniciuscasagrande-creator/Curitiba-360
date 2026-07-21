import React from 'react';
import { Calendar, Clock, Video, Phone, MapPin, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function CalendarAgendaView({ events = [], onNewEvent }) {
  const getTypeBadge = (tipo) => {
    switch (tipo) {
      case 'reuniao':
        return <span className="p-1 rounded bg-purple-100 text-purple-800 font-bold text-[9px] flex items-center gap-0.5"><Video className="w-3 h-3" /> Reunião Online</span>;
      case 'chamada':
        return <span className="p-1 rounded bg-blue-100 text-blue-800 font-bold text-[9px] flex items-center gap-0.5"><Phone className="w-3 h-3" /> Chamada</span>;
      case 'visita':
        return <span className="p-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] flex items-center gap-0.5"><MapPin className="w-3 h-3" /> Visita Presencial</span>;
      default:
        return <span className="p-1 rounded bg-slate-100 text-slate-700 font-bold text-[9px]">Follow-up</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-600" /> Agenda Comercial & Calendário de Reuniões
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Compromissos agendados de atendimento e apresentações de propostas.</p>
        </div>

        <button
          onClick={onNewEvent}
          className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 shadow-sm"
        >
          <PlusCircle className="w-3.5 h-3.5" /> Agendar Compromisso
        </button>
      </div>

      <div className="space-y-3">
        {events.map((evt) => (
          <div key={evt.id} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-900 text-white rounded-lg font-mono text-center font-bold text-[10px] leading-tight min-w-[54px]">
                <div>{evt.horaInicio}</div>
                <div className="text-[8px] text-purple-300">até {evt.horaFim}</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-xs">{evt.titulo}</span>
                  {getTypeBadge(evt.tipo)}
                </div>
                <p className="text-[11px] text-slate-600 font-medium">Cliente: <b>{evt.cliente}</b></p>
                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <span>Local / Link: {evt.local}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                ✓ Agendado
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
