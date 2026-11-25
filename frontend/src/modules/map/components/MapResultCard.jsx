import React from "react";
import {
  BadgeCheck,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import FavoriteButton from "../../favorites/components/FavoriteButton";

export default function MapResultCard({
  item,
  selected,
  onSelect,
}) {
  return (
    <article
      className={[
        "cursor-pointer overflow-hidden rounded-2xl border bg-white transition select-none text-left",
        selected
          ? "border-emerald-600 shadow-md ring-2 ring-emerald-100 font-semibold"
          : "border-slate-200 hover:border-emerald-200 hover:shadow-sm",
      ].join(" ")}
      onClick={() => onSelect(item)}
    >
      <div className="flex gap-3 p-3">
        <Link
          to={item.href}
          className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 text-decoration-none"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-emerald-700 my-0">
                {item.categoryLabel}
              </p>

              <Link
                to={item.href}
                className="text-decoration-none"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                <h2 className="mt-1 line-clamp-1 font-bold text-slate-950 hover:text-emerald-700 text-sm my-0">
                  {item.title}
                </h2>
              </Link>
            </div>

            <FavoriteButton
              itemId={item.id}
              label={false}
              size="icon"
              className="h-8 w-8 shrink-0"
            />
          </div>

          <div className="mt-2 flex items-center gap-1 text-xs">
            <Star
              size={14}
              className="fill-amber-400 text-amber-400"
            />

            <span className="font-semibold text-slate-900">
              {item.rating}
            </span>

            {item.partner && (
              <BadgeCheck
                size={14}
                className="ml-2 text-blue-600 shrink-0"
              />
            )}
          </div>

          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={14} className="shrink-0" />

            <span className="line-clamp-1">
              {item.neighborhood} ·{" "}
              {item.distance?.toFixed(1)} km
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
