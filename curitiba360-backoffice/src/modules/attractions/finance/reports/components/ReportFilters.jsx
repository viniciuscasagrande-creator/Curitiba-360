import { CalendarDays } from 'lucide-react';

export default function ReportFilters({
  period,
  allPeriod,
  category,
  agent,
  ticketType,
  categoryOptions,
  agentOptions,
  ticketTypeOptions,
  onPeriodChange,
  onAllPeriodChange,
  onCategoryChange,
  onAgentChange,
  onTicketTypeChange,
}) {
  return (
    <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm print:border-0 print:p-0 print:shadow-none text-left">
      <h2 className="text-sm font-black text-slate-900">
        Filtros
      </h2>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
            Período
          </span>

          <div className="flex flex-wrap gap-2">
            <DateInput
              value={period.startDate}
              disabled={allPeriod}
              onChange={(value) =>
                onPeriodChange({
                  ...period,
                  startDate: value,
                })
              }
            />

            <DateInput
              value={period.endDate}
              disabled={allPeriod}
              onChange={(value) =>
                onPeriodChange({
                  ...period,
                  endDate: value,
                })
              }
            />
          </div>
        </div>

        <label className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-600">
          <input
            type="checkbox"
            checked={allPeriod}
            onChange={(event) =>
              onAllPeriodChange(
                event.target.checked,
              )
            }
          />

          Todo o período
        </label>

        <SelectFilter
          label="Categoria"
          value={category}
          options={categoryOptions}
          onChange={onCategoryChange}
        />

        <SelectFilter
          label="Agente"
          value={agent}
          options={agentOptions}
          onChange={onAgentChange}
        />

        <SelectFilter
          label="Tipo de ingresso"
          value={ticketType}
          options={ticketTypeOptions}
          onChange={onTicketTypeChange}
        />
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
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="date"
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 rounded-2xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 disabled:bg-slate-100 disabled:text-slate-400"
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
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 min-w-40 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500"
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
