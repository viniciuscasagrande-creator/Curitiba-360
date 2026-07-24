import {
  RotateCcw,
  Search,
} from 'lucide-react';

const inputClass =
  'h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10';

const labelClass =
  'mb-2 block text-[10px] font-black uppercase tracking-[0.08em] text-slate-500';

export default function AgencyFilters({
  filters,
  cities,
  states,
  companyTypes,
  onChange,
  onReset,
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm text-left">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
        <label className="flex-1">
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
              placeholder="Nome, CNPJ, responsável, cidade..."
              onChange={(event) =>
                onChange(
                  'search',
                  event.target.value,
                )
              }
              className={`${inputClass} pl-11`}
            />
          </div>
        </label>

        <FilterSelect
          label="Cidade"
          value={filters.city}
          allLabel="Todas as cidades"
          options={cities}
          onChange={(value) =>
            onChange('city', value)
          }
        />

        <FilterSelect
          label="UF"
          value={filters.state}
          allLabel="Todas"
          options={states}
          onChange={(value) =>
            onChange('state', value)
          }
        />

        <FilterSelect
          label="Tipo de empresa"
          value={filters.companyType}
          allLabel="Todos os tipos"
          options={companyTypes}
          onChange={(value) =>
            onChange(
              'companyType',
              value,
            )
          }
        />

        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 transition hover:bg-slate-50"
        >
          <RotateCcw size={15} />
          Limpar
        </button>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  options,
  allLabel,
  onChange,
}) {
  return (
    <label className="min-w-[170px]">
      <span className={labelClass}>
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={inputClass}
      >
        <option value="all">
          {allLabel}
        </option>

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
