import React from "react";
import {
  Heart,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PlaceCard({
  place,
}) {
  return (
    <article className="group min-w-[260px] max-w-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md text-left select-none">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Link
          to={place.href}
          aria-label={`Ver ${place.title}`}
        >
          <img
            src={place.image}
            alt={place.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>

        {place.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
            {place.badge}
          </span>
        )}

        <button
          type="button"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm transition hover:text-red-600 border-none cursor-pointer"
          aria-label={`Favoritar ${place.title}`}
        >
          <Heart
            size={18}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 text-sm">
          <Star
            size={16}
            className="fill-amber-400 text-amber-400"
            aria-hidden="true"
          />

          <span className="font-semibold text-slate-900">
            {place.rating}
          </span>

          <span className="text-slate-500 font-mono">
            ({place.reviews})
          </span>
        </div>

        <Link
          to={place.href}
          className="mt-2 block text-decoration-none"
        >
          <h3 className="line-clamp-1 font-bold text-slate-950 transition group-hover:text-emerald-700 my-0">
            {place.title}
          </h3>
        </Link>

        <p className="mt-1 text-sm text-slate-500 my-0">
          {place.category}
        </p>

        <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
          <MapPin
            size={16}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />

          <span className="line-clamp-2">
            {place.location}
          </span>
        </div>
      </div>
    </article>
  );
}
