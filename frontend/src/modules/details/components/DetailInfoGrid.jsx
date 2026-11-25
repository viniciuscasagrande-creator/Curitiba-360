import React from "react";
import {
  Eye,
  MapPinned,
  Shapes,
  Star,
} from "lucide-react";

export default function DetailInfoGrid({
  item,
}) {
  const items = [
    {
      label: "Avaliação",
      value: item.rating,
      icon: Star,
    },
    {
      label: "Distância",
      value: `${item.distance.toFixed(
        1
      )} km`,
      icon: MapPinned,
    },
    {
      label: "Visitas",
      value:
        item.visits >= 1000
          ? `${(
              item.visits / 1000
            ).toFixed(1)} mil`
          : item.visits,
      icon: Eye,
    },
    {
      label: "Categoria",
      value: item.categoryLabel,
      icon: Shapes,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4 text-left select-none">
      {items.map((info) => {
        const Icon = info.icon;

        return (
          <div
            key={info.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <Icon
              size={20}
              className="text-emerald-700 animate-pulse"
            />

            <p className="mt-4 text-lg font-bold text-slate-950 my-0">
              {info.value}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500 my-0">
              {info.label}
            </p>
          </div>
        );
      })}
    </section>
  );
}
