import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

function createPaginationItems(
  currentPage,
  totalPages,
) {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  const items = [1];

  if (currentPage > 4) {
    items.push('start-ellipsis');
  }

  const start = Math.max(
    2,
    currentPage - 1,
  );

  const end = Math.min(
    totalPages - 1,
    currentPage + 1,
  );

  for (
    let page = start;
    page <= end;
    page += 1
  ) {
    items.push(page);
  }

  if (
    currentPage <
    totalPages - 3
  ) {
    items.push('end-ellipsis');
  }

  items.push(totalPages);

  return items;
}

export function AgentPagination({
  page = 1,
  pageSize = 10,
  totalItems = 0,
  totalPages = 1,
  firstItemIndex = 0,
  lastItemIndex = 0,
  pageSizeOptions = [
    10,
    20,
    30,
    50,
  ],
  disabled = false,
  onPageChange,
  onPageSizeChange,
}) {
  const paginationItems =
    createPaginationItems(
      page,
      totalPages,
    );

  return (
    <div
      className={[
        'flex flex-col gap-4 text-left',
        'border-t border-slate-200',
        'bg-white px-4 py-4',
        'sm:flex-row',
        'sm:items-center',
        'sm:justify-between',
      ].join(' ')}
    >
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-slate-500">
          {totalItems === 0 ? (
            'Nenhum resultado'
          ) : (
            <>
              Mostrando{' '}
              <strong className="text-slate-800">
                {firstItemIndex}
              </strong>{' '}
              até{' '}
              <strong className="text-slate-800">
                {lastItemIndex}
              </strong>{' '}
              de{' '}
              <strong className="text-slate-800">
                {totalItems}
              </strong>
            </>
          )}
        </p>

        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          Por página

          <select
            value={pageSize}
            disabled={disabled}
            onChange={(event) =>
              onPageSizeChange?.(
                Number(
                  event.target.value,
                ),
              )
            }
            className={[
              'h-9 rounded-lg',
              'border border-slate-200',
              'bg-white px-2',
              'text-xs font-semibold',
              'text-slate-700',
              'outline-none',
              'focus:border-slate-400',
              'focus:ring-4',
              'focus:ring-slate-100',
              'disabled:opacity-50',
            ].join(' ')}
          >
            {pageSizeOptions.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ),
            )}
          </select>
        </label>
      </div>

      <nav
        className="flex items-center gap-1"
        aria-label="Paginação de agentes"
      >
        <button
          type="button"
          disabled={
            disabled || page <= 1
          }
          onClick={() =>
            onPageChange?.(
              page - 1,
            )
          }
          className={[
            'flex h-9 w-9',
            'items-center',
            'justify-center',
            'rounded-lg',
            'border border-slate-200',
            'bg-white',
            'text-slate-500',
            'transition-colors',
            'hover:bg-slate-50',
            'hover:text-slate-900',
            'disabled:cursor-not-allowed',
            'disabled:opacity-40',
          ].join(' ')}
        >
          <ChevronLeft size={16} />
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {paginationItems.map(
            (item) => {
              if (
                typeof item ===
                'string'
              ) {
                return (
                  <span
                    key={item}
                    className="flex h-9 w-9 items-center justify-center text-sm text-slate-400"
                  >
                    …
                  </span>
                );
              }

              const active =
                item === page;

              return (
                <button
                  key={item}
                  type="button"
                  disabled={disabled}
                  aria-current={
                    active
                      ? 'page'
                      : undefined
                  }
                  onClick={() =>
                    onPageChange?.(
                      item,
                    )
                  }
                  className={[
                    'flex h-9 min-w-9',
                    'items-center',
                    'justify-center',
                    'rounded-lg px-2',
                    'text-sm font-semibold',
                    'transition-colors',
                    'disabled:cursor-not-allowed',
                    'disabled:opacity-50',

                    active
                      ? [
                          'bg-slate-950',
                          'text-white',
                        ].join(' ')
                      : [
                          'border',
                          'border-slate-200',
                          'bg-white',
                          'text-slate-600',
                          'hover:bg-slate-50',
                          'hover:text-slate-900',
                        ].join(' '),
                  ].join(' ')}
                >
                  {item}
                </button>
              );
            },
          )}
        </div>

        <span className="px-2 text-sm font-semibold text-slate-600 sm:hidden">
          {page} / {totalPages}
        </span>

        <button
          type="button"
          disabled={
            disabled ||
            page >= totalPages
          }
          onClick={() =>
            onPageChange?.(
              page + 1,
            )
          }
          className={[
            'flex h-9 w-9',
            'items-center',
            'justify-center',
            'rounded-lg',
            'border border-slate-200',
            'bg-white',
            'text-slate-500',
            'transition-colors',
            'hover:bg-slate-50',
            'hover:text-slate-900',
            'disabled:cursor-not-allowed',
            'disabled:opacity-40',
          ].join(' ')}
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}

export default AgentPagination;
