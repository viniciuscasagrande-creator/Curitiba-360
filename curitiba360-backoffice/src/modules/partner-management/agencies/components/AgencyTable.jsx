import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Building2,
  LoaderCircle,
} from 'lucide-react';

import { useRef } from 'react';

import {
  formatDateTime,
} from '../../shared/utils/partnerFormatters';

import AgencyRowActions from './AgencyRowActions';
import AgencyStatusBadge from './AgencyStatusBadge';
import AgencyTablePagination from './AgencyTablePagination';

const columns = [
  {
    field: 'id',
    label: 'ID',
    className: 'w-[90px]',
  },
  {
    field: 'tradeName',
    label: 'Nome Fantasia',
    className: 'min-w-[210px]',
  },
  {
    field: 'cnpj',
    label: 'CNPJ',
    className: 'min-w-[170px]',
  },
  {
    field: 'email',
    label: 'E-mail Responsável',
    className: 'min-w-[230px]',
  },
  {
    field: 'status',
    label: 'Status',
    className: 'min-w-[185px]',
  },
  {
    field: 'agentsCount',
    label: 'Agentes',
    className: 'w-[110px]',
  },
  {
    field: 'createdAt',
    label: 'Cadastro',
    className: 'min-w-[170px]',
  },
  {
    field: 'city',
    label: 'Cidade/UF',
    className: 'min-w-[170px]',
  },
];

export default function AgencyTable({
  agencies,
  isLoading,

  sorting,
  onSort,

  selectedIds,
  allVisibleSelected,
  someVisibleSelected,
  onToggleSelection,
  onToggleAll,

  pagination,

  onView,
  onEdit,
  onApprove,
  onReject,
  onSuspend,
  onInactivate,
  onReactivate,
  onDelete,
}) {
  const selectAllReference = useRef(null);

  if (selectAllReference.current) {
    selectAllReference.current.indeterminate =
      someVisibleSelected;
  }

  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm text-left">
      <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-black text-slate-900">
            Agências cadastradas
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Consulte e gerencie os
            registros de agências.
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-600">
          {pagination.totalItems}{' '}
          registro(s)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1300px] border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="w-14 border-b border-slate-200 px-5 py-4 text-left">
                <input
                  ref={selectAllReference}
                  type="checkbox"
                  aria-label="Selecionar todas as agências da página"
                  checked={
                    allVisibleSelected
                  }
                  onChange={onToggleAll}
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
              </th>

              {columns.map((column) => (
                <SortableHeader
                  key={column.field}
                  field={column.field}
                  label={column.label}
                  className={
                    column.className
                  }
                  sorting={sorting}
                  onSort={onSort}
                />
              ))}

              <th className="w-20 border-b border-slate-200 px-5 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-500">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <LoadingRow />
            ) : agencies.length === 0 ? (
              <EmptyRow />
            ) : (
              agencies.map((agency) => {
                const selected =
                  selectedIds.includes(
                    agency.id,
                  );

                return (
                  <tr
                    key={agency.id}
                    className={[
                      'group border-b border-slate-100 transition last:border-b-0',
                      selected
                        ? 'bg-blue-50/60'
                        : 'hover:bg-slate-50/80',
                    ].join(' ')}
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        aria-label={`Selecionar ${agency.tradeName}`}
                        checked={selected}
                        onChange={() =>
                          onToggleSelection(
                            agency.id,
                          )
                        }
                        className="h-4 w-4 cursor-pointer rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                      />
                    </td>

                    <td className="px-5 py-4 text-xs font-black text-slate-500">
                      #{agency.id}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          onView?.(agency)
                        }
                        className="text-left"
                      >
                        <strong className="block text-xs font-black text-slate-900 transition hover:text-blue-700">
                          {agency.tradeName}
                        </strong>

                        <span className="mt-1 block max-w-[230px] truncate text-[10px] font-medium text-slate-400">
                          {agency.corporateName}
                        </span>
                      </button>
                    </td>

                    <td className="px-5 py-4 text-xs font-bold text-slate-600">
                      {agency.cnpj || '—'}
                    </td>

                    <td className="px-5 py-4">
                      <span className="block max-w-[230px] truncate text-xs font-bold text-slate-600">
                        {agency.email || '—'}
                      </span>

                      <span className="mt-1 block text-[10px] font-medium text-slate-400">
                        {agency.responsibleName ||
                          'Responsável não informado'}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <AgencyStatusBadge
                        status={agency.status}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex min-w-9 items-center justify-center rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700">
                        {Number(
                          agency.agentsCount ??
                            0,
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-xs font-bold text-slate-600">
                      {formatDateTime(
                        agency.createdAt,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <strong className="block text-xs font-black text-slate-700">
                        {agency.city || '—'}
                      </strong>

                      <span className="mt-1 block text-[10px] font-bold text-slate-400">
                        {agency.state ||
                          'UF não informada'}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <AgencyRowActions
                        agency={agency}
                        onView={onView}
                        onEdit={onEdit}
                        onApprove={
                          onApprove
                        }
                        onReject={onReject}
                        onSuspend={
                          onSuspend
                        }
                        onInactivate={
                          onInactivate
                        }
                        onReactivate={
                          onReactivate
                        }
                        onDelete={onDelete}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <AgencyTablePagination
        currentPage={
          pagination.currentPage
        }
        pageSize={pagination.pageSize}
        totalItems={
          pagination.totalItems
        }
        totalPages={
          pagination.totalPages
        }
        startItem={
          pagination.startItem
        }
        endItem={pagination.endItem}
        onPrevious={
          pagination.previousPage
        }
        onNext={pagination.nextPage}
        onPageChange={
          pagination.goToPage
        }
        onPageSizeChange={
          pagination.changePageSize
        }
      />
    </section>
  );
}

function SortableHeader({
  field,
  label,
  className,
  sorting,
  onSort,
}) {
  const active =
    sorting.field === field;

  let Icon = ArrowUpDown;

  if (
    active &&
    sorting.direction === 'asc'
  ) {
    Icon = ArrowUp;
  }

  if (
    active &&
    sorting.direction === 'desc'
  ) {
    Icon = ArrowDown;
  }

  return (
    <th
      className={[
        'border-b border-slate-200 px-5 py-4 text-left',
        className,
      ].join(' ')}
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className={[
          'inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider transition',
          active
            ? 'text-slate-900'
            : 'text-slate-500 hover:text-slate-800',
        ].join(' ')}
      >
        {label}

        <Icon size={13} />
      </button>
    </th>
  );
}

function LoadingRow() {
  return (
    <tr>
      <td
        colSpan={10}
        className="px-5 py-20 text-center"
      >
        <LoaderCircle
          size={28}
          className="mx-auto animate-spin text-slate-400"
        />

        <strong className="mt-4 block text-sm font-black text-slate-600">
          Carregando agências
        </strong>

        <p className="mt-1 text-xs font-medium text-slate-400">
          Aguarde enquanto buscamos os
          registros.
        </p>
      </td>
    </tr>
  );
}

function EmptyRow() {
  return (
    <tr>
      <td
        colSpan={10}
        className="px-5 py-20 text-center"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Building2 size={23} />
        </span>

        <strong className="mt-4 block text-sm font-black text-slate-700">
          Nenhuma agência encontrada
        </strong>

        <p className="mt-1 text-xs font-medium text-slate-400">
          Altere os filtros ou cadastre
          uma nova agência.
        </p>
      </td>
    </tr>
  );
}
