import {
  CalendarDays,
  RotateCcw,
  Search,
} from 'lucide-react';

export default function CourtesyReportFilters({
  filters,
  categoryOptions,
  agentOptions,
  sellerOptions,
  reasonOptions,
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
            Filtros
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Consulte as cortesias emitidas para a atração.
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
            Período
          </span>

          <div className="grid gap-2 sm:grid-cols-2">
            <DateInput
              value={filters.startDate}
              disabled={filters.allPeriod}
              onChange={(value) =>
                updateFilter('startDate', value)
              }
            />

            <DateInput
              value={filters.endDate}
              disabled={filters.allPeriod}
              onChange={(value) =>
                updateFilter('endDate', value)
              }
            />
          </div>

          <label className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-600">
            <input
              type="checkbox"
              checked={filters.allPeriod}
              onChange={(event) =>
                updateFilter(
                  'allPeriod',
                  event.target.checked,
                )
              }
              className="h-4 w-4 rounded border-slate-300 text-emerald-600"
            />

            Todo o período
          </label>
        </div>

        <SelectFilter
          label="Categoria"
          value={filters.category}
          options={categoryOptions}
          onChange={(value) =>
            updateFilter('category', value)
          }
        />

        <SelectFilter
          label="Agência"
          value={filters.agency}
          options={agentOptions}
          onChange={(value) =>
            updateFilter('agency', value)
          }
        />

        <SelectFilter
          label="Vendedor"
          value={filters.seller}
          options={sellerOptions}
          onChange={(value) =>
            updateFilter('seller', value)
          }
        />

        <SelectFilter
          label="Motivo"
          value={filters.reason}
          options={reasonOptions}
          onChange={(value) =>
            updateFilter('reason', value)
          }
        />

        <label className="block md:col-span-2 text-left">
          <span className={labelClass}>
            Recebedor
          </span>

          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={filters.customer}
              placeholder="Pesquisar nome do recebedor"
              onChange={(event) =>
                updateFilter(
                  'customer',
                  event.target.value,
                )
              }
              className={`${inputClass} w-full pl-11`}
            />
          </div>
        </label>
      </div>
    </section>
  );
}

function DateInput({
  value,
  disabled,
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
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`${inputClass} w-full pl-11 disabled:bg-slate-100 disabled:text-slate-400`}
      />
    </div>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <label className="block text-left">
      <span className={labelClass}>
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`${inputClass} w-full`}
      >
        <option value="all">Todos</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

const labelClass =
  'mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-slate-500';

const inputClass =
  'h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10';
