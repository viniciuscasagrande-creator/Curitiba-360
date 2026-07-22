import React from "react";
import {
  Accessibility,
  BadgeCheck,
  Heart,
  PawPrint,
  RotateCcw,
  WalletCards,
} from "lucide-react";

import {
  MAP_CATEGORIES,
} from "../constants/mapConfig";

function ToggleFilter({
  active,
  icon: Icon,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition cursor-pointer",
        active
          ? "border-emerald-700 bg-emerald-700 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:text-emerald-700",
      ].join(" ")}
    >
      <Icon
        size={15}
        aria-hidden="true"
      />

      {label}
    </button>
  );
}

export default function MapFilters({
  filters,
  favoritesOnly,
  onChange,
  onFavoritesChange,
  onClear,
}) {
  function updateFilter(
    name,
    value
  ) {
    onChange({
      ...filters,
      [name]: value,
    });
  }

  return (
    <section className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 select-none">
      <select
        value={filters.category}
        onChange={(event) =>
          updateFilter(
            "category",
            event.target.value
          )
        }
        className="h-10 shrink-0 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-600 cursor-pointer"
      >
        {MAP_CATEGORIES.map(
          (category) => (
            <option
              key={
                category.value ||
                "all"
              }
              value={category.value}
            >
              {category.label}
            </option>
          )
        )}
      </select>

      <ToggleFilter
        active={favoritesOnly}
        icon={Heart}
        label="Favoritos"
        onClick={() =>
          onFavoritesChange(
            !favoritesOnly
          )
        }
      />

      <ToggleFilter
        active={filters.partner}
        icon={BadgeCheck}
        label="Parceiros"
        onClick={() =>
          updateFilter(
            "partner",
            !filters.partner
          )
        }
      />

      <ToggleFilter
        active={filters.free}
        icon={WalletCards}
        label="Gratuitos"
        onClick={() =>
          updateFilter(
            "free",
            !filters.free
          )
        }
      />

      <ToggleFilter
        active={filters.accessible}
        icon={Accessibility}
        label="Acessível"
        onClick={() =>
          updateFilter(
            "accessible",
            !filters.accessible
          )
        }
      />

      <ToggleFilter
        active={filters.petFriendly}
        icon={PawPrint}
        label="Pet friendly"
        onClick={() =>
          updateFilter(
            "petFriendly",
            !filters.petFriendly
          )
        }
      />

      <button
        type="button"
        onClick={onClear}
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 border-none bg-transparent cursor-pointer"
      >
        <RotateCcw
          size={14}
          aria-hidden="true"
        />

        Limpar
      </button>
    </section>
  );
}
