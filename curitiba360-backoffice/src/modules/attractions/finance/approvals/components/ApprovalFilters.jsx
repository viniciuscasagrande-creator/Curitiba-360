import { CalendarDays, RotateCcw, Search } from 'lucide-react';

const labelClass =
  'mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-slate-500';

const inputClass =
  'h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10';

export default function ApprovalFilters({
  filters,
  statusOptions,
  bankOptions,
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
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm print:hidden text-left">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-black text-slate-900">
            Filtros de aprovação
          </h2>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Filtre por período, status, banco ou busque por produtor/ID.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-black text-slate-600 transition hover:bg-slate-50"
        >
          <RotateCcw size={15} />
          Limpar filtros
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="block text-left">
          <span className={labelClass}>Data inicial</span>
          <div className="relative">
            <CalendarDays
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => updateFilter('startDate', e.target.value)}
              className={`${inputClass} w-full pl-11`}
            />
          </div>
        </label>

        <label className="block text-left">
          <span className={labelClass}>Data final</span>
          <div className="relative">
            <CalendarDays
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => updateFilter('endDate', e.target.value)}
              className={`${inputClass} w-full pl-11`}
            />
          </div>
        </label>

        <label className="block text-left">
          <span className={labelClass}>Status</span>
          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            className={`${inputClass} w-full`}
          >
            <option value="all">Todos os Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-left">
          <span className={labelClass}>Banco</span>
          <select
            value={filters.bank}
            onChange={(e) => updateFilter('bank', e.target.value)}
            className={`${inputClass} w-full`}
          >
            <option value="all">Todos os Bancos</option>
            {bankOptions.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-left">
          <span className={labelClass}>Pesquisa</span>
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={filters.search}
              placeholder="Produtor, ID ou evento..."
              onChange={(e) => updateFilter('search', e.target.value)}
              className={`${inputClass} w-full pl-11`}
            />
          </div>
        </label>
      </div>
    </section>
  );
}
