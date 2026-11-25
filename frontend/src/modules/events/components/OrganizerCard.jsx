import React from 'react';
import { Building2, Star, Calendar, Mail, Phone } from 'lucide-react';

export function OrganizerCard({ organizer = 'Organizador Curitiba 360', rating = '4.9', totalEvents = 24, contact = 'contato@organizador.com' }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
      <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold">
        Organizador do Evento
      </h3>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xl shrink-0">
          <Building2 size={28} />
        </div>

        <div className="flex-1">
          <h4 className="text-base font-bold text-slate-100">{organizer}</h4>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star size={14} className="fill-amber-400" />
              <span>{rating} / 5.0</span>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <Calendar size={14} className="text-slate-400" />
              <span>{totalEvents} eventos realizados</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Mail size={14} className="text-amber-400" />
          {contact}
        </span>
        <button
          type="button"
          onClick={() => alert(`Fale com a produção de ${organizer}`)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
        >
          Falar com Produtor
        </button>
      </div>
    </div>
  );
}
export default OrganizerCard;
