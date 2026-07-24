import {
  Filter,
  RotateCcw,
  X,
} from 'lucide-react';

import {
  getAgentActiveFilterItems,
} from '../utils/agentFilterUtils';

function AgentFilterChip({
  item,
  disabled = false,
  onRemove,
}) {
  return (
    <div
      className={[
        'group text-left',
        'inline-flex',
        'max-w-full',
        'items-center',
        'gap-1.5',
        'rounded-xl',
        'border',
        'border-slate-200',
        'bg-white',
        'py-1.5',
        'pl-3',
        'pr-1.5',
        'text-xs',
        'shadow-sm',
        'transition-all',
        'hover:border-slate-300',
        'hover:shadow',
      ].join(' ')}
    >
      <span className="shrink-0 font-semibold text-slate-500">
        {item.fieldLabel}:
      </span>

      <span className="truncate font-bold text-slate-800">
        {item.valueLabel}
      </span>

      <button
        type="button"
        disabled={disabled}
        aria-label={`Remover filtro ${item.fieldLabel}: ${item.valueLabel}`}
        title={`Remover filtro ${item.valueLabel}`}
        onClick={() => onRemove?.(item)}
        className={[
          'ml-0.5',
          'flex h-6 w-6',
          'shrink-0',
          'items-center',
          'justify-center',
          'rounded-lg',
          'text-slate-400',
          'transition-colors',
          'hover:bg-slate-100',
          'hover:text-slate-800',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-slate-300',
          'disabled:cursor-not-allowed',
          'disabled:opacity-40',
        ].join(' ')}
      >
        <X size={13} />
      </button>
    </div>
  );
}

function AgentActiveFiltersHeader({
  count,
  disabled = false,
  showClearButton = true,
  onClear,
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-left">
      <div className="flex min-w-0 items-center gap-2">
        <div
          className={[
            'flex h-8 w-8',
            'shrink-0',
            'items-center',
            'justify-center',
            'rounded-lg',
            'bg-slate-100',
            'text-slate-600',
          ].join(' ')}
        >
          <Filter size={15} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
            Filtros ativos
          </p>

          <p className="text-[11px] text-slate-400">
            {count === 1
              ? '1 filtro aplicado'
              : `${count} filtros aplicados`}
          </p>
        </div>
      </div>

      {showClearButton && (
        <button
          type="button"
          disabled={disabled}
          onClick={onClear}
          className={[
            'inline-flex h-8',
            'shrink-0',
            'items-center',
            'justify-center',
            'gap-1.5',
            'rounded-lg',
            'px-2.5',
            'text-xs',
            'font-semibold',
            'text-slate-500',
            'transition-colors',
            'hover:bg-slate-100',
            'hover:text-slate-800',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-slate-300',
            'disabled:cursor-not-allowed',
            'disabled:opacity-40',
          ].join(' ')}
        >
          <RotateCcw size={13} />

          Limpar
        </button>
      )}
    </div>
  );
}

export function AgentActiveFilters({
  filters = {},
  agencies = [],

  disabled = false,
  includeSearch = false,
  ignoredFields = [],
  showHeader = true,
  showClearButton = true,
  compact = false,

  statusLabels,
  availabilityLabels,
  typeLabels,
  specialtyLabels,
  stateLabels,

  onRemove,
  onClear,
}) {
  const items = getAgentActiveFilterItems(filters, {
    agencies,
    includeSearch,
    ignoredFields,
    statuses: statusLabels,
    availability: availabilityLabels,
    types: typeLabels,
    specialties: specialtyLabels,
    states: stateLabels,
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={[
        'rounded-2xl text-left',
        'border border-slate-200',
        compact
          ? 'bg-transparent p-0 border-none'
          : 'bg-slate-50/80 p-4',
      ].join(' ')}
    >
      {showHeader && (
        <AgentActiveFiltersHeader
          count={items.length}
          disabled={disabled}
          showClearButton={showClearButton}
          onClear={onClear}
        />
      )}

      <div
        className={[
          'flex flex-wrap gap-2',
          showHeader ? 'mt-3' : '',
        ].join(' ')}
      >
        {items.map((item) => (
          <AgentFilterChip
            key={item.id}
            item={item}
            disabled={disabled}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

export default AgentActiveFilters;
