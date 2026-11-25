import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

import {
  conditionStatusLabels,
  conditionTypeLabels
} from '../data/commercialMock';

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700',
  inactive: 'bg-slate-100 text-slate-500'
};

const typeStyles = {
  percentage: 'bg-blue-50 text-blue-700',
  fixed_value: 'bg-violet-50 text-violet-700'
};

function formatValue(condition) {
  if (condition.type === 'percentage') {
    return `${condition.value}%`;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(condition.value);
}

export function CommercialConditionsTable({
  conditions,
  selectedIds,
  page,
  pageSize,
  totalItems,
  onToggle,
  onToggleAll,
  onEdit,
  onPageChange,
  onPageSizeChange
}) {
  const allSelected =
    conditions.length > 0 &&
    conditions.every((item) =>
      selectedIds.includes(item.id)
    );

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm text-left">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1350px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-14 px-5 py-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                  className="h-4 w-4 accent-emerald-600 cursor-pointer"
                />
              </th>

              {[
                'ID',
                'Apelido',
                'Status',
                'Tipo',
                'Valor',
                'Crédito à vista',
                'Crédito parcelado',
                'PIX',
                'Antecipação',
                'Prazo',
                'Internacional',
                'Contratos'
              ].map((label) => (
                <th
                  key={label}
                  className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500"
                >
                  {label}
                </th>
              ))}

              <th className="w-14" />
            </tr>
          </thead>

          <tbody>
            {conditions.map((condition) => {
              const selected = selectedIds.includes(
                condition.id
              );

              return (
                <tr
                  key={condition.id}
                  className={[
                    'border-t border-slate-100 transition',
                    selected
                      ? 'bg-emerald-50/50'
                      : 'hover:bg-slate-50'
                  ].join(' ')}
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        onToggle(condition.id)
                      }
                      className="h-4 w-4 accent-emerald-600 cursor-pointer"
                    />
                  </td>

                  <td className="px-4 py-4 text-xs font-semibold text-slate-600 font-mono">
                    {condition.id}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onEdit(condition)}
                      className="text-left"
                    >
                      <strong className="block text-sm font-bold text-slate-900">
                        {condition.nickname}
                      </strong>

                      <span className="mt-0.5 block text-[10px] text-slate-400 font-medium">
                        Atualizado em{' '}
                        {new Intl.DateTimeFormat(
                          'pt-BR'
                        ).format(
                          new Date(condition.updatedAt)
                        )}
                      </span>
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={[
                        'rounded-full px-3 py-1.5 text-[11px] font-bold',
                        statusStyles[condition.status]
                      ].join(' ')}
                    >
                      {conditionStatusLabels[
                        condition.status
                      ]}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={[
                        'rounded-full px-3 py-1.5 text-[11px] font-bold',
                        typeStyles[condition.type]
                      ].join(' ')}
                    >
                      {conditionTypeLabels[
                        condition.type
                      ]}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm font-bold text-slate-800">
                    {formatValue(condition)}
                  </td>

                  <td className="px-4 py-4 text-xs font-medium text-slate-600">
                    {condition.fees.creditCash}%
                  </td>

                  <td className="px-4 py-4 text-xs font-medium text-slate-600">
                    {condition.fees.creditInstallment}%
                  </td>

                  <td className="px-4 py-4 text-xs font-medium text-slate-600">
                    {condition.fees.pix}%
                  </td>

                  <td className="px-4 py-4 text-xs font-medium text-slate-600">
                    {condition.fees.anticipation}%
                  </td>

                  <td className="px-4 py-4 text-xs font-bold text-slate-700">
                    {condition.paymentTermDays} dias
                  </td>

                  <td className="px-4 py-4 text-xs font-medium text-slate-600">
                    {condition.fees.international}%
                  </td>

                  <td className="px-4 py-4 text-xs font-bold text-slate-700">
                    {condition.contractsCount}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onEdit(condition)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <TableFooter
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}

function TableFooter({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange
}) {
  const first =
    totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const last = Math.min(page * pageSize, totalItems);

  return (
    <footer className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span>Itens por página</span>

        <select
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(Number(event.target.value))
          }
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-700"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500 font-medium">
          {first} a {last} de {totalItems}
        </span>

        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50"
        >
          <ChevronLeft size={17} />
        </button>

        <span className="text-xs font-bold text-slate-700">
          {page} / {totalPages}
        </span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </footer>
  );
}

export default CommercialConditionsTable;
