import React from "react";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlaceCard({
  id,
  title,
  subtitle,
  image,
  rating = 5.0,
  reviews = 0,
  favorite = false,
  partner = false,
  category = "",
  neighborhood = "",
  type = "",
  onToggleFavorite
}) {
  const detailLink = `/atracoes/${id}`;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <Link
      to={detailLink}
      className="relative flex flex-col w-56 shrink-0 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] group text-decoration-none text-left select-none"
    >
      {/* Media Content */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Favorite Icon */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-sm text-slate-600 transition hover:bg-white hover:text-red-500"
          aria-label={favorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <Heart
            size={16}
            className={`transition-colors ${favorite ? "fill-red-500 text-red-500" : "text-slate-600"}`}
          />
        </button>

        {/* Badges */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {partner && (
            <span className="inline-flex items-center rounded-lg bg-emerald-600 px-2 py-0.5 text-[9px] font-extrabold text-white uppercase tracking-wider shadow-sm">
              Parceiro Oficial
            </span>
          )}
          {category && (
            <span className="inline-flex items-center rounded-lg bg-slate-900/70 backdrop-blur px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Info details */}
      <div className="flex flex-col p-4 min-w-0">
        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
          <Star size={12} className="fill-amber-500 text-amber-500" />
          <span>{rating.toFixed(1)}</span>
          {reviews > 0 && (
            <span className="text-slate-400 font-medium font-mono">({reviews})</span>
          )}
        </div>

        <h3 className="mt-1.5 font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {title}
        </h3>

        <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
          {subtitle || neighborhood || "Curitiba"}
        </p>

        {neighborhood && (
          <div className="mt-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
            📍 {neighborhood}
          </div>
        )}
      </div>
    </Link>
  );
}
