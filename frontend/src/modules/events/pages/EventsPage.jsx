import React, { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import EventFilters from '../components/EventFilters';
import EventGrid from '../components/EventGrid';
import { EventService } from '../services/eventService';
import { Ticket, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export function EventsPage() {
  const { events, loading, error, filters, updateFilter, resetFilters } = useEvents();
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  React.useEffect(() => {
    EventService.getFavorites().then((res) => setFavorites(res.favorites));
  }, []);

  const handleToggleFavorite = async (eventId) => {
    const res = await EventService.toggleFavorite(eventId);
    setFavorites(res.favorites);
  };

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header da Página */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles size={16} />
            Curitiba 360 • Ingressos e Experiências
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Eventos em Curitiba e Região
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Descubra os melhores passeios, festivais, jantares e shows da capital paranaense.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Ticket size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Total de Eventos</span>
            <span className="text-xl font-bold text-white">{events.length} disponíveis</span>
          </div>
        </div>
      </div>

      {/* Seção de Filtros */}
      <EventFilters
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
      />

      {/* Grid de Eventos */}
      {error ? (
        <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-center">
          {error}
        </div>
      ) : (
        <EventGrid
          events={paginatedEvents}
          loading={loading}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-semibold text-slate-400 px-4">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
export default EventsPage;
