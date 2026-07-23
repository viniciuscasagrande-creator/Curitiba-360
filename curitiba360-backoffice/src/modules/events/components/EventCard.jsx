import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

export function EventCard({ event, isFavorite = false, onToggleFavorite }) {
  const navigate = useNavigate();

  const lowestPrice = event.lotes && event.lotes.length > 0
    ? Math.min(...event.lotes.map((l) => l.preco))
    : 0;

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="group relative flex flex-col bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-amber-500/40 overflow-hidden shadow-lg hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer"
    >
      {/* Container da Imagem */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={event.imagemUrl || 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?w=800&auto=format&fit=crop'}
          alt={event.nome}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* Badge Categoria */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/90 text-slate-950 backdrop-blur-md">
          {event.categoria || 'Evento'}
        </span>

        {/* Botão Favorito */}
        <div className="absolute top-3 right-3">
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite && onToggleFavorite(event.id)}
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {event.nome}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            {event.descricaoCurta || event.descricaoCompleta}
          </p>
        </div>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={14} className="text-amber-400 shrink-0" />
            <span>{event.dataInicio ? new Date(event.dataInicio).toLocaleDateString('pt-BR') : 'A definir'}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <MapPin size={14} className="text-amber-400 shrink-0" />
            <span className="truncate">{event.venue || event.cidade || 'Curitiba - PR'}</span>
          </div>
        </div>

        {/* Rodapé do Card */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">A partir de</span>
            <span className="text-base font-extrabold text-amber-400">
              {lowestPrice === 0 ? 'Gratuito' : `R$ ${lowestPrice.toFixed(2)}`}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/events/${event.id}`);
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-md transition-colors"
          >
            <Ticket size={14} />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
export default EventCard;
