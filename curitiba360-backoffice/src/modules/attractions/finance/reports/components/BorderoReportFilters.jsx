import {
  CalendarDays,
  RotateCcw,
} from 'lucide-react';

const labelClass =
  'mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-slate-500';

const inputClass =
  'h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10';

export default function BorderoReportFilters({
  filters,
  statusOptions,
  onChange,
  onReset,
}) {
  function updateFilter(field, value) {
    onChange({
      ...filters,
      [field]: value,
    });
  }

  return (
    <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm print:hidden text-left">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-black text-slate-900">
            Filtros do borderô
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Consulte o fechamento por período, referência e situação.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 transition hover:bg-slate-50"
        >
          <RotateCcw size={15} />
          Limpar filtros
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="xl:col-span-2">
          <span className={labelClass}>
            Período do fechamento
          </span>

          <div className="grid gap-2 sm:grid-cols-2">
            <DateInput
              value={filters.startDate}
              onChange={(value) =>
                updateFilter('startDate', value)
              }
            />

            <DateInput
              value={filters.endDate}
              onChange={(value) =>
                updateFilter('endDate', value)
              }
            />
          </div>
        </div>

        <label className="block text-left">
          <span className={labelClass}>
            Status
          </span>

          <select
            value={filters.status}
            onChange={(event) =>
              updateFilter(
                'status',
                event.target.value,
              )
            }
            className={`${inputClass} w-full`}
          >
            <option value="all">
              Todos
            </option>

            {statusOptions.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-left">
          <span className={labelClass}>
            Referência
          </span>

          <input
            type="search"
            value={filters.reference}
            placeholder="Ex.: BOR-2026-0001"
            onChange={(event) =>
              updateFilter(
                'reference',
                event.target.value,
              )
            }
            className={`${inputClass} w-full`}
          />
        </label>
      </div>
    </section>
  );
}

function DateInput({
  value,
  onChange,
}) {
  return (
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
        className={`${inputClass} w-full pl-11`}
      />
    </div>
  );
}
