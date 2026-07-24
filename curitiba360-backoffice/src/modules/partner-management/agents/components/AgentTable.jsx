import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  LoaderCircle,
} from 'lucide-react';

import {
  AgentEmptyState,
} from './AgentEmptyState';

import {
  AgentTableRow,
} from './AgentTableRow';

import {
  AGENT_TABLE_COLUMNS,
} from './AgentTableColumns';

function SortIcon({
  active,
  direction,
}) {
  if (!active) {
    return (
      <ArrowUpDown
        size={13}
        className="text-slate-300"
      />
    );
  }

  if (direction === 'asc') {
    return (
      <ArrowUp
        size={13}
        className="text-slate-700"
      />
    );
  }

  return (
    <ArrowDown
      size={13}
      className="text-slate-700"
    />
  );
}

function AgentTableSkeleton({
  rows = 6,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="hidden border-b border-slate-200 bg-slate-50 px-5 py-4 lg:block">
        <div className="grid grid-cols-8 gap-4">
          {Array.from({
            length: 8,
          }).map(
            (_, index) => (
              <div
                key={index}
                className="h-3 animate-pulse rounded bg-slate-200"
              />
            ),
          )}
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {Array.from({
          length: rows,
        }).map(
          (_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5"
            >
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-100" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-1/4 animate-pulse rounded bg-slate-100" />
              </div>

              <div className="hidden h-8 w-28 animate-pulse rounded-full bg-slate-100 md:block" />

              <div className="hidden h-4 w-20 animate-pulse rounded bg-slate-100 lg:block" />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function AgentTable({
  agents = [],
  sorting = {},
  isLoading = false,
  hasActiveFilters = false,
  onSort,
  onAgentClick,
  onOpenActions,
  onCreate,
  onClearFilters,
}) {
  if (isLoading) {
    return (
      <AgentTableSkeleton />
    );
  }

  if (!agents.length) {
    return (
      <AgentEmptyState
        hasFilters={
          hasActiveFilters
        }
        onCreate={onCreate}
        onClearFilters={
          onClearFilters
        }
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="hidden bg-slate-50/80 lg:table-header-group">
            <tr className="border-b border-slate-200">
              {AGENT_TABLE_COLUMNS.map(
                (column) => {
                  const Icon =
                    column.icon;

                  const isActive =
                    column.sortable &&
                    sorting.field ===
                      column.sortField;

                  return (
                    <th
                      key={
                        column.id
                      }
                      scope="col"
                      className={[
                        'px-4 py-3.5',
                        'text-xs font-bold',
                        'uppercase',
                        'tracking-wide',
                        'text-slate-500',
                        column.align ===
                        'right'
                          ? 'text-right'
                          : 'text-left',
                        column.className ||
                          '',
                        column.id ===
                        'agent'
                          ? 'pl-5'
                          : '',
                      ].join(' ')}
                    >
                      {column.sortable ? (
                        <button
                          type="button"
                          onClick={() =>
                            onSort?.(
                              column.sortField,
                            )
                          }
                          className={[
                            'inline-flex items-center gap-1.5',
                            'rounded-lg',
                            'transition-colors',
                            'hover:text-slate-900',
                            'focus:outline-none',
                            'focus:ring-2',
                            'focus:ring-slate-300',
                            column.align ===
                            'right'
                              ? 'ml-auto'
                              : '',
                          ].join(' ')}
                        >
                          {Icon && (
                            <Icon
                              size={
                                14
                              }
                            />
                          )}

                          <span>
                            {
                              column.label
                            }
                          </span>

                          <SortIcon
                            active={
                              isActive
                            }
                            direction={
                              sorting.direction
                            }
                          />
                        </button>
                      ) : (
                        <div
                          className={[
                            'inline-flex items-center gap-1.5',
                            column.align ===
                            'right'
                              ? 'justify-end'
                              : '',
                          ].join(' ')}
                        >
                          {Icon && (
                            <Icon
                              size={
                                14
                              }
                            />
                          )}

                          {
                            column.label
                          }
                        </div>
                      )}
                    </th>
                  );
                },
              )}
            </tr>
          </thead>

          <tbody>
            {agents.map(
              (agent) => (
                <AgentTableRow
                  key={agent.id}
                  agent={agent}
                  onClick={
                    onAgentClick
                  }
                  onOpenActions={
                    onOpenActions
                  }
                />
              ),
            )}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Exibindo{' '}
          <strong className="font-semibold text-slate-700">
            {agents.length}
          </strong>{' '}
          agente
          {agents.length !== 1
            ? 's'
            : ''}
        </p>

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <LoaderCircle
              size={14}
              className="animate-spin"
            />
            Atualizando dados
          </div>
        )}
      </footer>
    </section>
  );
}

export default AgentTable;
