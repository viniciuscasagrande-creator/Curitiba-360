import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  ORDER_FILTERS,
} from "../constants/orderConfig";

export default function OrderFilters({
  filters,
  onChange,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 select-none text-left">
      <div className="flex flex-col gap-4 lg:flex-row">
        <label className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={filters.search}
            onChange={(event) =>
              onChange(
                "search",
                event.target.value
              )
            }
            placeholder="Buscar por pedido, evento ou local"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="relative">
          <SlidersHorizontal
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={filters.sort}
            onChange={(event) =>
              onChange(
                "sort",
                event.target.value
              )
            }
            className="h-12 min-w-48 appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-8 text-sm font-medium outline-none"
          >
            <option value="recent">
              Mais recentes
            </option>

            <option value="oldest">
              Mais antigos
            </option>

            <option value="highest">
              Maior valor
            </option>

            <option value="lowest">
              Menor valor
            </option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {ORDER_FILTERS.map(
          (filter) => {
            const active =
              filters.status ===
              filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() =>
                  onChange(
                    "status",
                    filter.id
                  )
                }
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition cursor-pointer",
                  active
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          }
        )}
      </div>
    </section>
  );
}
