import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, MapPin, Star } from 'lucide-react';

export function AttractionCard({ attraction, distanceLabel, isFavorite = false, onFavorite }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg hover:border-amber-500/40 transition-all duration-300 group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
        <img
          src={attraction.coverImage || 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop'}
          alt={attraction.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={() => onFavorite && onFavorite(attraction.id)}
          className={`absolute right-3 top-3 grid size-10 place-items-center rounded-full backdrop-blur-md transition-all ${
            isFavorite ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40' : 'bg-black/50 text-slate-300 hover:text-white border border-white/10'
          }`}
        >
          <Heart className="size-5" fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <span className="absolute left-3 top-3 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-slate-950">
          {attraction.categoryName || 'Atrativo'}
        </span>
      </div>

      <div className="space-y-3 p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="line-clamp-2 text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
            {attraction.name}
          </h2>

          <div className="flex items-center gap-1.5 text-sm text-amber-400 font-semibold">
            <Star className="size-4 fill-amber-400" />
            <span>{attraction.rating ? attraction.rating.toFixed(1) : '4.8'}</span>
            <span className="text-slate-400 text-xs font-normal">({attraction.reviewCount || 100} avaliações)</span>
          </div>

          <div className="space-y-1 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-amber-400" />
              <span className="truncate">{attraction.address?.neighborhood || 'Curitiba'} {distanceLabel ? `• ${distanceLabel}` : ''}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-amber-400" />
              <span>{attraction.durationMinutes ? `Duração: ~${attraction.durationMinutes} min` : 'Consultar horário de funcionamento'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 mt-auto">
          <span className="font-extrabold text-amber-400 text-base">
            {attraction.free ? "Gratuito" : `A partir de R$ ${attraction.priceFrom?.toFixed(2)}`}
          </span>

          <Link
            to={`/turismo/${attraction.id}`}
            className="text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-xl transition-colors shadow-md"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
export default AttractionCard;
