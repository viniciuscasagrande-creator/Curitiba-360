import React from "react";
import {
  RotateCcw,
} from "lucide-react";

import {
  SEARCH_CATEGORIES,
  SEARCH_RATING_OPTIONS,
} from "../constants/searchOptions";

function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-50 select-none text-left"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(
            event.target.checked
          )
        }
        className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer"
      />

      {label}
    </label>
  );
}

export default function SearchFilters({
  filters,
  onChange,
  onClear,
}) {
  function updateFilter(
    field,
    value
  ) {
    onChange({
      ...filters,
      [field]: value,
    });
  }

  return (
    <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-left">
      <div className="flex items-center justify-between gap-4 select-none">
        <h2 className="font-bold text-slate-950 my-0">
          Filtros
        </h2>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 border-none bg-transparent cursor-pointer"
        >
          <RotateCcw
            size={14}
            aria-hidden="true"
          />

          Limpar
        </button>
      </div>

      <div>
        <label
          htmlFor="search-category"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Categoria
        </label>

        <select
          id="search-category"
          value={filters.category}
          onChange={(event) =>
            updateFilter(
              "category",
              event.target.value
            )
          }
          className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        >
          {SEARCH_CATEGORIES.map(
            (option) => (
              <option
                key={
                  option.value ||
                  "all"
                }
                value={option.value}
              >
                {option.label}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label
          htmlFor="search-rating"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Avaliação
        </label>

        <select
          id="search-rating"
          value={filters.rating}
          onChange={(event) =>
            updateFilter(
              "rating",
              event.target.value
            )
          }
          className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        >
          {SEARCH_RATING_OPTIONS.map(
            (option) => (
              <option
                key={
                  option.value ||
                  "all"
                }
                value={option.value}
              >
                {option.label}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3 select-none">
          <label
            htmlFor="search-distance"
            className="text-sm font-semibold text-slate-800"
          >
            Distância máxima
          </label>

          <span className="text-xs font-semibold text-emerald-700">
            {filters.maxDistance} km
          </span>
        </div>

        <input
          id="search-distance"
          type="range"
          min="1"
          max="30"
          step="1"
          value={filters.maxDistance}
          onChange={(event) =>
            updateFilter(
              "maxDistance",
              event.target.value
            )
          }
          className="w-full accent-emerald-700 cursor-pointer"
        />
      </div>

      <div className="space-y-1 border-t border-slate-200 pt-5">
        <FilterCheckbox
          id="filter-today"
          label="Disponível hoje"
          checked={filters.today}
          onChange={(value) =>
            updateFilter(
              "today",
              value
            )
          }
        />

        <FilterCheckbox
          id="filter-weekend"
          label="Fim de semana"
          checked={filters.weekend}
          onChange={(value) =>
            updateFilter(
              "weekend",
              value
            )
          }
        />

        <FilterCheckbox
          id="filter-free"
          label="Gratuito"
          checked={filters.free}
          onChange={(value) =>
            updateFilter(
              "free",
              value
            )
          }
        />

        <FilterCheckbox
          id="filter-partner"
          label="Parceiro oficial"
          checked={filters.partner}
          onChange={(value) =>
            updateFilter(
              "partner",
              value
            )
          }
        />

        <FilterCheckbox
          id="filter-pet-friendly"
          label="Pet friendly"
          checked={
            filters.petFriendly
          }
          onChange={(value) =>
            updateFilter(
              "petFriendly",
              value
            )
          }
        />

        <FilterCheckbox
          id="filter-accessible"
          label="Acessível"
          checked={
            filters.accessible
          }
          onChange={(value) =>
            updateFilter(
              "accessible",
              value
            )
          }
        />
      </div>
    </aside>
  );
}
