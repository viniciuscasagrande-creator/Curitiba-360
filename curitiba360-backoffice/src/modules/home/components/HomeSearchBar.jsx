import React from "react";
import {
  LocateFixed,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeSearchBar() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const query = String(
      formData.get("query") || ""
    ).trim();

    if (!query) {
      return;
    }

    navigate(
      `/buscar?q=${encodeURIComponent(query)}`
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-2">
        <Search
          size={20}
          className="shrink-0 text-slate-400"
          aria-hidden="true"
        />

        <input
          type="search"
          name="query"
          placeholder="Busque atrações, eventos, restaurantes..."
          autoComplete="off"
          className="h-10 min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
        />
      </div>

      <button
        type="button"
        className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 sm:flex border-none bg-transparent cursor-pointer"
        aria-label="Usar minha localização"
      >
        <LocateFixed
          size={19}
          aria-hidden="true"
        />
      </button>

      <button
        type="submit"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white transition hover:bg-emerald-800 border-none cursor-pointer"
        aria-label="Filtros de busca"
      >
        <SlidersHorizontal
          size={18}
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
