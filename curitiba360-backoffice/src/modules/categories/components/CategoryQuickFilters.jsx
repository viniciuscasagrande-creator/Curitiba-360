import React from "react";
import {
  Accessibility,
  BadgeCheck,
  CalendarDays,
  Clock3,
  PawPrint,
  Sparkles,
  TicketCheck,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickFilterDefinitions = {
  Hoje: {
    icon: Clock3,
    params: {
      hoje: "true",
    },
  },

  "Fim de semana": {
    icon: CalendarDays,
    params: {
      fimDeSemana: "true",
    },
  },

  Gratuitos: {
    icon: WalletCards,
    params: {
      gratuito: "true",
    },
  },

  Parceiros: {
    icon: BadgeCheck,
    params: {
      parceiro: "true",
    },
  },

  "Pet friendly": {
    icon: PawPrint,
    params: {
      petFriendly: "true",
    },
  },

  Acessível: {
    icon: Accessibility,
    params: {
      acessivel: "true",
    },
  },

  Destaques: {
    icon: Sparkles,
    params: {
      destaque: "true",
    },
  },

  Ingressos: {
    icon: TicketCheck,
    params: {
      ingressos: "true",
    },
  },
};

const defaultFilters = [
  "Hoje",
  "Fim de semana",
  "Gratuitos",
  "Parceiros",
  "Pet friendly",
  "Acessível",
];

export default function CategoryQuickFilters({
  category,
  filters = defaultFilters,
}) {
  function createHref(filterName) {
    const definition =
      quickFilterDefinitions[
        filterName
      ];

    const params =
      new URLSearchParams();

    if (category.searchCategory) {
      params.set(
        "categoria",
        category.searchCategory
      );
    }

    Object.entries(
      definition?.params || {}
    ).forEach(([key, value]) => {
      params.set(key, value);
    });

    return `/buscar?${params.toString()}`;
  }

  return (
    <section>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 scrollbar-none snap-x">
        {filters.map((filterName) => {
          const definition =
            quickFilterDefinitions[
              filterName
            ];

          if (!definition) {
            return null;
          }

          const Icon =
            definition.icon;

          return (
            <Link
              key={filterName}
              to={createHref(
                filterName
              )}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700 hover:shadow-md text-decoration-none"
            >
              <Icon
                size={17}
                aria-hidden="true"
              />

              {filterName}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
