import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

function createPageRange(
  currentPage,
  totalPages,
) {
  const pages = [];

  const start = Math.max(
    1,
    currentPage - 2,
  );

  const end = Math.min(
    totalPages,
    currentPage + 2,
  );

  if (start > 1) {
    pages.push(1);

    if (start > 2) {
      pages.push('ellipsis-start');
    }
  }

  for (
    let page = start;
    page <= end;
    page += 1
  ) {
    pages.push(page);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    pages.push(totalPages);
  }

  return pages;
}

export default function AgencyTablePagination({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  startItem,
  endItem,
  onPrevious,
  onNext,
  onPageChange,
  onPageSizeChange,
}) {
  const pages = createPageRange(
    currentPage,
    totalPages,
  );

  return (
    <footer className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between text-left">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-slate-500">
          Exibindo{' '}
          <strong className="text-slate-800">
            {startItem}
          </strong>{' '}
          a{' '}
          <strong className="text-slate-800">
            {endItem}
          </strong>{' '}
          de{' '}
          <strong className="text-slate-800">
            {totalItems}
          </strong>
        </span>

        <select
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(
              event.target.value,
            )
          }
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-600 outline-none"
        >
          <option value="5">
            5 por página
          </option>

          <option value="10">
            10 por página
          </option>

          <option value="20">
            20 por página
          </option>

          <option value="50">
            50 por página
          </option>
        </select>
      </div>

      <div className="flex items-center gap-1">
        <PaginationButton
          title="Página anterior"
          disabled={currentPage <= 1}
          onClick={onPrevious}
        >
          <ChevronLeft size={16} />
        </PaginationButton>

        {pages.map((page) => {
          if (
            page === 'ellipsis-start' ||
            page === 'ellipsis-end'
          ) {
            return (
              <span
                key={page}
                className="flex h-9 w-9 items-center justify-center text-xs font-black text-slate-400"
              >
                …
              </span>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={() =>
                onPageChange(page)
              }
              className={[
                'flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-xs font-black transition',
                currentPage === page
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800',
              ].join(' ')}
            >
              {page}
            </button>
          );
        })}

        <PaginationButton
          title="Próxima página"
          disabled={
            currentPage >= totalPages
          }
          onClick={onNext}
        >
          <ChevronRight size={16} />
        </PaginationButton>
      </div>
    </footer>
  );
}

function PaginationButton({
  title,
  disabled,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}
