import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../events/hooks/useEvents';
import EventCard from '../../events/components/EventCard';
import { Calendar, ArrowRight } from 'lucide-react';

export function EventsCarousel() {
  const navigate = useNavigate();
  const { events, loading } = useEvents();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Calendar size={20} className="text-amber-600" />
            Eventos em Destaque
          </h3>
          <p className="text-xs text-slate-500">Shows, espetáculos e feiras em Curitiba</p>
        </div>

        <button
          onClick={() => navigate('/eventos')}
          className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
        >
          Ver Todos ({events.length})
          <ArrowRight size={14} />
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400 text-xs">Carregando eventos...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
export default EventsCarousel;
