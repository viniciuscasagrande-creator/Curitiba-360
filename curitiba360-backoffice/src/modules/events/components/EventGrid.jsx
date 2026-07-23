import React from 'react';
import EventCard from './EventCard';
import { CalendarX } from 'lucide-react';

export function EventGrid({ events = [], loading = false, favorites = [], onToggleFavorite }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="h-96 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse p-4 flex flex-col justify-between">
            <div className="h-44 bg-slate-800/80 rounded-xl" />
            <div className="space-y-3 my-4">
              <div className="h-5 bg-slate-800 rounded w-3/4" />
              <div className="h-4 bg-slate-800/60 rounded w-1/2" />
            </div>
            <div className="h-10 bg-slate-800/80 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800/80 my-6">
        <div className="p-4 rounded-full bg-slate-800/80 text-amber-400 mb-4">
          <CalendarX size={36} />
        </div>
        <h3 className="text-xl font-bold text-slate-200">Nenhum evento encontrado</h3>
        <p className="text-slate-400 text-sm mt-1 max-w-md">
          Tente ajustar seus filtros de busca ou escolher outra categoria para ver eventos disponíveis em Curitiba.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((evt) => (
        <EventCard
          key={evt.id}
          event={evt}
          isFavorite={favorites.includes(evt.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
export default EventGrid;
