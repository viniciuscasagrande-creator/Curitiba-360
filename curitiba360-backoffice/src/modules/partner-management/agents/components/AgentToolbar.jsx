import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowUpAZ,
  ArrowUpNarrowWide,
  ChevronDown,
  Filter,
  LayoutGrid,
  List,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

import {
  AgentSearch,
} from './AgentSearch';

const SORT_OPTIONS = [
  {
    value: 'createdAt:desc',
    field: 'createdAt',
    direction: 'desc',
    label: 'Mais recentes',
    icon: ArrowDownWideNarrow,
  },
  {
    value: 'createdAt:asc',
    field: 'createdAt',
    direction: 'asc',
    label: 'Mais antigos',
    icon: ArrowUpNarrowWide,
  },
  {
    value: 'name:asc',
    field: 'name',
    direction: 'asc',
    label: 'Nome: A–Z',
    icon: ArrowDownAZ,
  },
  {
    value: 'name:desc',
    field: 'name',
    direction: 'desc',
    label: 'Nome: Z–A',
    icon: ArrowUpAZ,
  },
  {
    value:
      'performanceScore:desc',
    field:
      'performanceScore',
    direction: 'desc',
    label:
      'Maior performance',
    icon: ArrowDownWideNarrow,
  },
  {
    value:
      'salesAmount:desc',
    field: 'salesAmount',
    direction: 'desc',
    label: 'Maior receita',
    icon: ArrowDownWideNarrow,
  },
  {
    value:
      'eventsCount:desc',
    field: 'eventsCount',
    direction: 'desc',
    label: 'Mais eventos',
    icon: ArrowDownWideNarrow,
  },
];

function getSortingValue(
  sorting = {},
) {
  return [
    sorting.field ||
      'createdAt',
    sorting.direction ||
      'desc',
  ].join(':');
}

function ToolbarButton({
  children,
  active = false,
  disabled = false,
  onClick,
  title,
  className = '',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={[
        'inline-flex h-11',
        'items-center',
        'justify-center',
        'gap-2',
        'rounded-xl',
        'border px-3.5',
        'text-sm',
        'font-semibold',
        'transition-all',
        'focus:outline-none',
        'focus:ring-4',
        'focus:ring-slate-100',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',

        active
          ? [
              'border-slate-900',
              'bg-slate-900',
              'text-white',
              'hover:bg-slate-800',
            ].join(' ')
          : [
              'border-slate-200',
              'bg-white',
              'text-slate-700',
              'hover:border-slate-300',
              'hover:bg-slate-50',
            ].join(' '),

        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function ViewModeSelector({
  value = 'table',
  onChange,
  disabled = false,
}) {
  return (
    <div
      className={[
        'inline-flex',
        'h-11',
        'items-center',
        'rounded-xl',
        'border',
        'border-slate-200',
        'bg-slate-50',
        'p-1',
      ].join(' ')}
      aria-label="Modo de visualização"
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          onChange?.('table')
        }
        aria-label="Visualização em lista"
        title="Visualização em lista"
        className={[
          'flex h-8 w-8',
          'items-center',
          'justify-center',
          'rounded-lg',
          'transition-all',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',

          value === 'table'
            ? [
                'bg-white',
                'text-slate-900',
                'shadow-sm',
              ].join(' ')
            : [
                'text-slate-400',
                'hover:text-slate-700',
              ].join(' '),
        ].join(' ')}
      >
        <List size={16} />
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          onChange?.('grid')
        }
        aria-label="Visualização em cartões"
        title="Visualização em cartões"
        className={[
          'flex h-8 w-8',
          'items-center',
          'justify-center',
          'rounded-lg',
          'transition-all',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',

          value === 'grid'
            ? [
                'bg-white',
                'text-slate-900',
                'shadow-sm',
              ].join(' ')
            : [
                'text-slate-400',
                'hover:text-slate-700',
              ].join(' '),
        ].join(' ')}
      >
        <LayoutGrid
          size={16}
        />
      </button>
    </div>
  );
}

export function AgentToolbar({
  search = '',
  sorting = {},
  viewMode = 'table',

  activeFiltersCount = 0,
  resultCount = 0,

  isLoading = false,
  disabled = false,

  onSearchChange,
  onSortingChange,
  onViewModeChange,
  onOpenFilters,
  onClearFilters,
}) {
  const sortingValue =
    getSortingValue(
      sorting,
    );

  function handleSortingChange(
    event,
  ) {
    const selectedValue =
      event.target.value;

    const selectedOption =
      SORT_OPTIONS.find(
        (option) =>
          option.value ===
          selectedValue,
      );

    if (!selectedOption) {
      return;
    }

    onSortingChange?.(
      selectedOption.field,
      selectedOption.direction,
    );
  }

  const hasActiveFilters =
    activeFiltersCount > 0;

  return (
    <section
      className={[
        'rounded-2xl text-left',
        'border',
        'border-slate-200',
        'bg-white',
        'p-4',
        'shadow-sm',
      ].join(' ')}
    >
      <div
        className={[
          'flex flex-col',
          'gap-3',
          'xl:flex-row',
          'xl:items-center',
          'xl:justify-between',
        ].join(' ')}
      >
        <div
          className={[
            'w-full',
            'xl:max-w-xl',
          ].join(' ')}
        >
          <AgentSearch
            value={search}
            disabled={disabled}
            isLoading={
              isLoading
            }
            placeholder="Buscar por agente, e-mail, CPF, telefone ou agência..."
            onSearch={
              onSearchChange
            }
          />
        </div>

        <div
          className={[
            'flex flex-wrap',
            'items-center',
            'gap-2',
          ].join(' ')}
        >
          <ToolbarButton
            active={
              hasActiveFilters
            }
            disabled={disabled}
            onClick={
              onOpenFilters
            }
            title="Abrir filtros"
          >
            <Filter size={17} />

            <span>
              Filtros
            </span>

            {hasActiveFilters && (
              <span
                className={[
                  'inline-flex',
                  'min-w-5',
                  'items-center',
                  'justify-center',
                  'rounded-full',
                  'px-1.5',
                  'py-0.5',
                  'text-[10px]',
                  'font-bold',

                  hasActiveFilters
                    ? [
                        'bg-white',
                        'text-slate-900',
                      ].join(' ')
                    : [
                        'bg-slate-100',
                        'text-slate-600',
                      ].join(' '),
                ].join(' ')}
              >
                {
                  activeFiltersCount
                }
              </span>
            )}
          </ToolbarButton>

          {hasActiveFilters && (
            <ToolbarButton
              disabled={disabled}
              onClick={
                onClearFilters
              }
              title="Limpar todos os filtros"
            >
              <RotateCcw
                size={16}
              />

              <span className="hidden sm:inline">
                Limpar
              </span>
            </ToolbarButton>
          )}

          <div className="relative">
            <select
              value={sortingValue}
              disabled={disabled}
              onChange={
                handleSortingChange
              }
              aria-label="Ordenar agentes"
              className={[
                'h-11',
                'min-w-[175px]',
                'appearance-none',
                'rounded-xl',
                'border',
                'border-slate-200',
                'bg-white',
                'pl-10',
                'pr-9',
                'text-sm',
                'font-semibold',
                'text-slate-700',
                'outline-none',
                'transition-all',
                'hover:border-slate-300',
                'focus:border-slate-400',
                'focus:ring-4',
                'focus:ring-slate-100',
                'disabled:cursor-not-allowed',
                'disabled:bg-slate-50',
                'disabled:text-slate-400',
              ].join(' ')}
            >
              {SORT_OPTIONS.map(
                (option) => (
                  <option
                    key={
                      option.value
                    }
                    value={
                      option.value
                    }
                  >
                    {
                      option.label
                    }
                  </option>
                ),
              )}
            </select>

            <SlidersHorizontal
              size={16}
              className={[
                'pointer-events-none',
                'absolute',
                'left-3.5',
                'top-1/2',
                '-translate-y-1/2',
                'text-slate-400',
              ].join(' ')}
            />

            <ChevronDown
              size={15}
              className={[
                'pointer-events-none',
                'absolute',
                'right-3',
                'top-1/2',
                '-translate-y-1/2',
                'text-slate-400',
              ].join(' ')}
            />
          </div>

          <ViewModeSelector
            value={viewMode}
            disabled={disabled}
            onChange={
              onViewModeChange
            }
          />
        </div>
      </div>

      <div
        className={[
          'mt-3',
          'flex flex-col',
          'gap-2',
          'border-t',
          'border-slate-100',
          'pt-3',
          'sm:flex-row',
          'sm:items-center',
          'sm:justify-between',
        ].join(' ')}
      >
        <p className="text-xs text-slate-500">
          <strong className="font-semibold text-slate-700">
            {resultCount}
          </strong>{' '}
          agente
          {resultCount !== 1
            ? 's'
            : ''}{' '}
          encontrado
          {resultCount !== 1
            ? 's'
            : ''}
        </p>

        {hasActiveFilters && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter size={13} />

            <span>
              {
                activeFiltersCount
              }{' '}
              filtro
              {activeFiltersCount !==
              1
                ? 's'
                : ''}{' '}
              ativo
              {activeFiltersCount !==
              1
                ? 's'
                : ''}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default AgentToolbar;
