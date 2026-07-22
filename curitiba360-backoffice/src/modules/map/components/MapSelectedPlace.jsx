import React from "react";
import {
  ArrowRight,
  MapPin,
  Star,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import FavoriteButton from "../../favorites/components/FavoriteButton";

export default function MapSelectedPlace({
  item,
  onClose,
}) {
  if (!item) {
    return null;
  }

  return (
    <article className="absolute bottom-20 left-4 right-4 z-40 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:left-auto sm:right-4 sm:w-[360px] text-left select-none">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow border-none cursor-pointer"
        aria-label="Fechar local selecionado"
      >
        <X size={16} />
      </button>

      <div className="relative h-36 bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold text-emerald-700 my-0">
          {item.categoryLabel}
        </p>

        <h2 className="mt-1 text-lg font-bold text-slate-950 my-0">
          {item.title}
        </h2>

        <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1">
            <Star
              size={14}
              className="fill-amber-400 text-amber-400"
            />

            {item.rating}
          </span>

          <span className="inline-flex items-center gap-1">
            <MapPin size={14} />
            {item.distance?.toFixed(1)} km
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <FavoriteButton
            itemId={item.id}
            label={false}
            size="icon"
          />

          <Link
            to={item.href}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 text-decoration-none"
          >
            Ver detalhes
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
