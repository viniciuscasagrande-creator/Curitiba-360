import React from "react";
import {
  Search,
  X,
} from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  onClear,
}) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        autoFocus
        autoComplete="off"
        placeholder="Busque atrações, eventos, restaurantes..."
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 border-none bg-transparent cursor-pointer"
          aria-label="Limpar busca"
        >
          <X
            size={17}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}
