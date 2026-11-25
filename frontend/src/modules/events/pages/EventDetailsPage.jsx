import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvent } from '../hooks/useEvent';
import EventBanner from '../components/EventBanner';
import EventGallery from '../components/EventGallery';
import EventInfo from '../components/EventInfo';
import VenueMap from '../components/VenueMap';
import OrganizerCard from '../components/OrganizerCard';
import { ShieldCheck, ArrowLeft, Ticket } from 'lucide-react';

export function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, loading, error, isFavorite, toggleFavorite } = useEvent(id || 'EVT-9001');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center text-slate-400">
        <div className="animate-pulse space-y-4 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 mx-auto flex items-center justify-center text-amber-400">
            <Ticket size={32} />
          </div>
          <p className="font-semibold text-sm">Carregando detalhes do evento...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center space-y-4">
        <p className="text-rose-400 font-bold">{error || 'Evento não encontrado.'}</p>
        <button
          onClick={() => navigate('/events')}
          className="px-4 py-2 bg-slate-800 text-white rounded-xl"
        >
          Voltar para lista de eventos
        </button>
      </div>
    );
  }

  const handleBuyClick = () => {
    navigate(`/events/${event.id}/tickets`);
  };

  const galleryImages = [
    event.imagemUrl,
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Botão de Voltar */}
      <button
        onClick={() => navigate('/events')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para a busca de eventos
      </button>

      {/* Banner Principal */}
      <EventBanner
        event={event}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        onBuyClick={handleBuyClick}
      />

      {/* Grid de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-8">
          <EventInfo event={event} />

          <EventGallery images={galleryImages} />

          <VenueMap venue={event.venue} address={event.endereco} />

          {/* Seção de Políticas */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-400" />
              Políticas de Compra e Reembolso
            </h3>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
              <li>{event.politicas?.cancelamento || 'Cancelamento gratuito em até 7 dias após a compra.'}</li>
              <li>{event.politicas?.reembolso || 'Reembolso integral via PIX ou estorno em cartão.'}</li>
              <li>{event.politicas?.meiaEntrada || 'Meia-entrada válida conforme legislação federal e estadual.'}</li>
            </ul>
          </div>
        </div>

        {/* Coluna Lateral */}
        <div className="space-y-6">
          <OrganizerCard
            organizer={event.organizador}
            contact={event.gestorEvento ? `${event.gestorEvento} (Atendimento)` : undefined}
          />

          {/* Card Flutuante de Ação Rápida */}
          <div className="sticky top-6 bg-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="text-center space-y-1">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Pronto para ir?</span>
              <h4 className="text-xl font-extrabold text-white">Selecione seus Ingressos</h4>
              <p className="text-xs text-amber-400 font-medium">Lotes limitados disponíveis</p>
            </div>

            <button
              onClick={handleBuyClick}
              className="w-full py-4 font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-base"
            >
              <Ticket size={20} />
              Comprar Ingressos Agora
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              🔒 Pagamento 100% seguro garantido pelo Curitiba 360
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventDetailsPage;
