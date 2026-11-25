import React from "react";
import {
  ArrowUpDown,
  Map,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FavoritesToolbar({
  count,
  sort,
  onSortChange,
  onClear,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-left select-none">
      <div>
        <p className="text-sm font-semibold text-slate-950 my-0">
          {count} favorito
          {count === 1 ? "" : "s"}
        </p>

        <p className="mt-1 text-xs text-slate-500 my-0">
          Sua seleção de lugares e experiências.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          to="/mapa?favoritos=true"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 text-decoration-none"
        >
          <Map
            size={17}
            aria-hidden="true"
          />

          Ver no mapa
        </Link>

        <label className="relative block">
          <span className="sr-only">
            Ordenar favoritos
          </span>

          <ArrowUpDown
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />

          <select
            value={sort}
            onChange={(event) =>
              onSortChange(
                event.target.value
              )
            }
            className="h-10 rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 cursor-pointer"
          >
            <option value="saved">
              Salvos recentemente
            </option>

            <option value="rating">
              Melhor avaliados
            </option>

            <option value="distance">
              Mais próximos
            </option>

            <option value="title">
              Ordem alfabética
            </option>
          </select>
        </label>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100 cursor-pointer"
        >
          <Trash2
            size={16}
            aria-hidden="true"
          />

          Limpar
        </button>
      </div>
    </div>
  );
}
