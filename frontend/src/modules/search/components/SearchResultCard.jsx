import React from "react";
import {
  Accessibility,
  BadgeCheck,
  MapPin,
  PawPrint,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import FavoriteButton from "../../favorites/components/FavoriteButton";

export default function SearchResultCard({
  item,
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md text-left select-none">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Link
          to={item.href}
          aria-label={`Ver ${item.title}`}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>

        <FavoriteButton
          itemId={item.id}
          label={false}
          size="icon"
          className="absolute right-3 top-3 rounded-full bg-white/95 shadow-sm"
        />

        {item.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Destaque
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold select-none">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
            {item.categoryLabel}
          </span>

          {item.partner && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
              <BadgeCheck
                size={14}
                aria-hidden="true"
              />

              Parceiro
            </span>
          )}
        </div>

        <Link
          to={item.href}
          className="mt-3 block text-decoration-none"
        >
          <h2 className="line-clamp-1 text-lg font-bold text-slate-950 transition group-hover:text-emerald-700 my-0">
            {item.title}
          </h2>
        </Link>

        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 my-0">
          {item.subtitle}
        </p>

        <div className="mt-3 flex items-center gap-1 text-sm select-none">
          <Star
            size={16}
            className="fill-amber-400 text-amber-400"
            aria-hidden="true"
          />

          <span className="font-semibold text-slate-900">
            {item.rating}
          </span>

          <span className="text-slate-500 font-mono">
            ({item.reviews})
          </span>
        </div>

        <div className="mt-3 flex items-start gap-2 text-sm text-slate-600 select-none">
          <MapPin
            size={16}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />

          <span className="line-clamp-1">
            {item.neighborhood},{" "}
            {item.city} ·{" "}
            {item.distance.toFixed(1)} km
          </span>
        </div>

        {(item.petFriendly ||
          item.accessible) && (
          <div className="mt-4 flex flex-wrap gap-2 select-none">
            {item.petFriendly && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                <PawPrint
                  size={13}
                  aria-hidden="true"
                />

                Pet friendly
              </span>
            )}

            {item.accessible && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                <Accessibility
                  size={13}
                  aria-hidden="true"
                />

                Acessível
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
