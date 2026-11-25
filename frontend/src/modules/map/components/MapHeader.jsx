import React from "react";
import {
  ArrowLeft,
  List,
  Map,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MapHeader({
  query,
  onQueryChange,
  resultCount,
  mobileView,
  onMobileViewChange,
}) {
  return (
    <header className="space-y-4 text-left select-none">
      <div className="flex items-center gap-3">
        <Link
          to="/buscar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 text-decoration-none"
          aria-label="Voltar para a busca"
        >
          <ArrowLeft
            size={19}
            aria-hidden="true"
          />
        </Link>

        <div className="relative min-w-0 flex-1">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />

          <input
            type="search"
            value={query}
            onChange={(event) =>
              onQueryChange(
                event.target.value
              )
            }
            placeholder="Buscar no mapa..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 box-border"
          />

          {query && (
            <button
              type="button"
              onClick={() =>
                onQueryChange("")
              }
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 border-none cursor-pointer bg-transparent"
              aria-label="Limpar busca"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 my-0">
            Explorar no mapa
          </h1>

          <p className="mt-1 text-sm text-slate-500 my-0">
            {resultCount} local
            {resultCount === 1
              ? ""
              : "is"}{" "}
            encontrado
            {resultCount === 1
              ? ""
              : "s"}
          </p>
        </div>

        <div className="flex rounded-xl border border-slate-200 bg-white p-1 lg:hidden">
          <button
            type="button"
            onClick={() =>
              onMobileViewChange(
                "map"
              )
            }
            className={[
              "flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition border-none cursor-pointer bg-transparent",
              mobileView === "map"
                ? "bg-emerald-700 text-white"
                : "text-slate-600",
            ].join(" ")}
          >
            <Map size={15} />
            Mapa
          </button>

          <button
            type="button"
            onClick={() =>
              onMobileViewChange(
                "list"
              )
            }
            className={[
              "flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition border-none cursor-pointer bg-transparent",
              mobileView === "list"
                ? "bg-emerald-700 text-white"
                : "text-slate-600",
            ].join(" ")}
          >
            <List size={15} />
            Lista
          </button>
        </div>
      </div>
    </header>
  );
}
