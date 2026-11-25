import React from "react";
import {
  Accessibility,
  Baby,
  Car,
  ShoppingBag,
  Toilet,
  Utensils,
  UsersRound,
  Wifi,
} from "lucide-react";

const amenityConfig = {
  wheelchair: {
    label: "Acesso para cadeirantes",
    icon: Accessibility,
  },

  "accessible-bathroom": {
    label: "Banheiro acessível",
    icon: Toilet,
  },

  parking: {
    label: "Estacionamento",
    icon: Car,
  },

  wifi: {
    label: "Wi-Fi",
    icon: Wifi,
  },

  family: {
    label: "Ideal para famílias",
    icon: Baby,
  },

  restaurant: {
    label: "Restaurante",
    icon: Utensils,
  },

  store: {
    label: "Loja",
    icon: ShoppingBag,
  },

  "guided-tour": {
    label: "Visita guiada",
    icon: UsersRound,
  },
};

export default function DetailAmenities({
  amenities = [],
}) {
  if (!amenities.length) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left select-none">
      <h2 className="text-xl font-bold text-slate-950 my-0">
        Recursos e acessibilidade
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {amenities.map((amenity) => {
          const config =
            amenityConfig[amenity];

          if (!config) {
            return null;
          }

          const Icon = config.icon;

          return (
            <div
              key={amenity}
              className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm font-medium text-slate-700"
            >
              <Icon
                size={18}
                className="text-emerald-700 shrink-0"
              />

              {config.label}
            </div>
          );
        })}
      </div>
    </section>
  );
}
