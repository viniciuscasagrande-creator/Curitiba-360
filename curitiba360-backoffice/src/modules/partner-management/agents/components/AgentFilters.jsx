import { RotateCcw, Search } from 'lucide-react';

const inputClass =
  'h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10';

export default function AgentFilters({
  search,
  agencyFilter,
  agencies,
  onSearchChange,
  onAgencyChange,
  onReset,
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm text-left">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-slate-500">
              Buscar Agente
            </label>
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Nome, CPF ou E-mail..."
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-slate-500">
              Filtrar por Agência
            </label>
            <select
              value={agencyFilter}
              onChange={(e) => onAgencyChange(e.target.value)}
              className={inputClass}
            >
              <option value="all">Todas as Agências</option>
              {agencies.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.tradeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-black text-slate-600 hover:bg-slate-50 self-end md:self-auto"
        >
          <RotateCcw size={15} />
          Limpar
        </button>
      </div>
    </div>
  );
}
