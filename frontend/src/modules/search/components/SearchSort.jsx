import React from "react";
import {
  ArrowUpDown,
} from "lucide-react";

import {
  SEARCH_SORT_OPTIONS,
} from "../constants/searchOptions";

export default function SearchSort({
  value,
  onChange,
}) {
  return (
    <div className="flex items-center gap-2 select-none">
      <ArrowUpDown
        size={17}
        className="text-slate-500"
        aria-hidden="true"
      />

      <select
        value={value}
        aria-label="Ordenar resultados"
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 cursor-pointer"
      >
        {SEARCH_SORT_OPTIONS.map(
          (option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
}
