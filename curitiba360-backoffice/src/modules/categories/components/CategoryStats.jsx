import React from "react";
import {
  BadgeCheck,
  MapPinned,
  Star,
} from "lucide-react";

export default function CategoryStats({
  total = 0,
  partners = 0,
  averageRating = 0,
}) {
  const stats = [
    {
      label: "Opções encontradas",
      value: total,
      icon: MapPinned,
    },
    {
      label: "Parceiros oficiais",
      value: partners,
      icon: BadgeCheck,
    },
    {
      label: "Avaliação média",
      value: averageRating
        ? averageRating.toFixed(1)
        : "—",
      icon: Star,
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-3 text-left">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm select-none"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Icon
                size={21}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-xl font-bold text-slate-950 my-0">
                {stat.value}
              </p>

              <p className="text-xs font-medium text-slate-500 my-0">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
