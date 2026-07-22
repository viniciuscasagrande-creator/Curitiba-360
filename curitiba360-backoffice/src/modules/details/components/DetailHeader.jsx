import React from "react";
import {
  BadgeCheck,
  MapPin,
  Star,
} from "lucide-react";

export default function DetailHeader({
  item,
  openingStatus,
}) {
  return (
    <header className="text-left select-none">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {item.categoryLabel}
        </span>

        {item.partner?.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <BadgeCheck size={14} />
            Parceiro oficial
          </span>
        )}

        {item.featured && (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Destaque
          </span>
        )}

        {openingStatus && (
          <span
            className={[
              "rounded-full px-3 py-1 text-xs font-semibold",
              openingStatus.isOpen
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-600",
            ].join(" ")}
          >
            {openingStatus.label}
          </span>
        )}
      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl my-0">
        {item.title}
      </h1>

      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 my-0">
        {item.subtitle}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <div className="flex items-center gap-1">
          <Star
            size={18}
            className="fill-amber-400 text-amber-400"
          />

          <span className="font-bold text-slate-950">
            {item.rating}
          </span>

          <span className="text-slate-500">
            ({item.reviewsCount} avaliações)
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <MapPin size={17} />

          <span>
            {item.address.neighborhood},{" "}
            {item.address.city} ·{" "}
            {item.distance.toFixed(1)} km
          </span>
        </div>
      </div>
    </header>
  );
}
