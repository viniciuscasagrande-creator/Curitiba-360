import React from 'react';
import { Calendar, MapPin, Ticket, ShieldCheck, Star } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

export function EventBanner({ event, isFavorite, onToggleFavorite, onBuyClick }) {
  if (!event) return null;

  const lowestPrice = event.lotes && event.lotes.length > 0
    ? Math.min(...event.lotes.map((l) => l.preco))
    : 0;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
      {/* Imagem de Fundo em Blur */}
      <div className="absolute inset-0">
        <img
          src={event.imagemUrl}
          alt={event.nome}
          className="w-full h-full object-cover blur-lg opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
        {/* Capa Principal */}
        <div className="w-full md:w-80 h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
          <img
            src={event.imagemUrl}
            alt={event.nome}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informações Principais */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-slate-950">
              {event.categoria}
            </span>
            {event.subcategoria && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {event.subcategoria}
              </span>
            )}
            <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-slate-800/90 text-amber-400 border border-amber-500/30">
              Classificação: {event.classificacao || 'Livre'}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            {event.nome}
          </h1>

          <p className="text-slate-300 text-sm md:text-base line-clamp-3">
            {event.descricaoCompleta || event.descricaoCurta}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-amber-400" />
              <span>
                {event.dataInicio ? new Date(event.dataInicio).toLocaleDateString('pt-BR') : 'A definir'}
                {event.horarioAbertura && ` às ${event.horarioAbertura}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-amber-400" />
              <span>{event.venue || 'Curitiba - PR'}</span>
            </div>
          </div>

          {/* Ações e Preço */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 block">Ingressos a partir de</span>
              <span className="text-2xl font-black text-amber-400">
                {lowestPrice === 0 ? 'Gratuito' : `R$ ${lowestPrice.toFixed(2)}`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size={22} />
              <ShareButton title={event.nome} />
              <button
                type="button"
                onClick={onBuyClick}
                className="flex items-center gap-2 px-6 py-3 font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-2xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
              >
                <Ticket size={20} />
                Garantir Ingressos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventBanner;
