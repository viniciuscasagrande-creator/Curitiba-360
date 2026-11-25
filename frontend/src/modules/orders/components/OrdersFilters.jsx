import React from "react";
import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function OrdersFilters({
  filters,
  onChange,
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
    <section className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_220px_190px] select-none text-left">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={filters.search}
          onChange={(event) =>
            updateFilter(
              "search",
              event.target.value
            )
          }
          placeholder="Buscar por evento ou pedido"
          className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 transition"
        />
      </div>

      <select
        value={filters.status}
        onChange={(event) =>
          updateFilter(
            "status",
            event.target.value
          )
        }
        className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none cursor-pointer"
      >
        <option value="all">
          Todos os status
        </option>

        <option value="pending">
          Aguardando pagamento
        </option>

        <option value="confirmed">
          Confirmados
        </option>

        <option value="completed">
          Concluídos
        </option>

        <option value="cancelled">
          Cancelados
        </option>

        <option value="refunded">
          Reembolsados
        </option>
      </select>

      <div className="relative">
        <SlidersHorizontal
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          value={filters.sort}
          onChange={(event) =>
            updateFilter(
              "sort",
              event.target.value
            )
          }
          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none cursor-pointer"
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
        </select>
      </div>
    </section>
  );
}
