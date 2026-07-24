import {
  CalendarDays,
  RotateCcw,
  Search,
} from 'lucide-react';

const inputClass =
  'h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10';

const labelClass =
  'mb-2 block text-[10px] font-black uppercase tracking-[0.08em] text-slate-500';

export default function ApprovalFilters({
  filters,
  statusOptions,
  producers,
  onChange,
  onReset,
}) {
  function update(field, value) {
    onChange({
      ...filters,
      [field]: value,
    });
  }

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm text-left">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-black text-slate-900">
            Filtros de análise
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Localize solicitações por período, produtor e situação.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-black text-slate-600 hover:bg-slate-50"
        >
          <RotateCcw size={15} />
          Limpar filtros
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <DateField
          label="Data inicial"
          value={filters.startDate}
          onChange={(value) =>
            update('startDate', value)
          }
        />

        <DateField
          label="Data final"
          value={filters.endDate}
          onChange={(value) =>
            update('endDate', value)
          }
        />

        <label className="block text-left">
          <span className={labelClass}>
            Status
          </span>

          <select
            value={filters.status}
            onChange={(event) =>
              update('status', event.target.value)
            }
            className={inputClass}
          >
            <option value="all">Todos</option>

            {statusOptions.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-left">
          <span className={labelClass}>
            Produtor
          </span>

          <select
            value={filters.producer}
            onChange={(event) =>
              update(
                'producer',
                event.target.value,
              )
            }
            className={inputClass}
          >
            <option value="all">
              Todos os produtores
            </option>

            {producers.map((producer) => (
              <option
                key={producer}
                value={producer}
              >
                {producer}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-left">
          <span className={labelClass}>
            Pesquisa
          </span>

          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={filters.search}
              placeholder="Referência, evento ou banco"
              onChange={(event) =>
                update(
                  'search',
                  event.target.value,
                )
              }
              className={`${inputClass} pl-11`}
            />
          </div>
        </label>
      </div>
    </section>
  );
}

function DateField({
  label,
  value,
  onChange,
}) {
  return (
    <label className="block text-left">
      <span className={labelClass}>
        {label}
      </span>

      <div className="relative">
        <CalendarDays
          size={15}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="date"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`${inputClass} pl-11`}
        />
      </div>
    </label>
  );
}
