import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Landmark,
  MoreHorizontal
} from 'lucide-react';

import {
  conditionStatusLabels
} from '../data/commercialMock';

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0));
}

export function FinancialInformationTable({
  items,
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
    items.length > 0 &&
    items.every((item) =>
      selectedIds.includes(item.id)
    );

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const first =
    totalItems === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const last = Math.min(
    page * pageSize,
    totalItems
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
                'Saque',
                'Percentual',
                'Valor máximo',
                'Prazo mínimo',
                'Desconto PIX',
                'Desconto TED',
                'Parceiros'
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
            {items.map((item) => {
              const selected =
                selectedIds.includes(item.id);

              return (
                <tr
                  key={item.id}
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
                        onToggle(item.id)
                      }
                      className="h-4 w-4 accent-emerald-600 cursor-pointer"
                    />
                  </td>

                  <td className="px-4 py-4 text-xs font-semibold text-slate-600 font-mono">
                    {item.id}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="flex items-center gap-3 text-left"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                        <Landmark size={18} />
                      </span>

                      <strong className="text-sm font-bold text-slate-900">
                        {item.nickname}
                      </strong>
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={[
                        'rounded-full px-3 py-1.5 text-[11px] font-bold',
                        item.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      ].join(' ')}
                    >
                      {conditionStatusLabels[
                        item.status
                      ]}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-xs font-bold text-slate-700">
                    {item.withdrawal.enabled
                      ? 'Liberado'
                      : 'Bloqueado'}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-600 font-medium">
                    {item.withdrawal.enabled
                      ? `${item.withdrawal.percentageLimit}%`
                      : '-'}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-600 font-medium">
                    {item.withdrawal.enabled
                      ? formatCurrency(
                          item.withdrawal.amountLimit
                        )
                      : '-'}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-600 font-medium">
                    {item.withdrawal.enabled
                      ? `${item.withdrawal.minimumDays} dias`
                      : '-'}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-600 font-medium">
                    {item.discounts.pix.enabled
                      ? formatCurrency(
                          item.discounts.pix.value
                        )
                      : 'Não aplica'}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-600 font-medium">
                    {item.discounts.ted.enabled
                      ? formatCurrency(
                          item.discounts.ted.value
                        )
                      : 'Não aplica'}
                  </td>

                  <td className="px-4 py-4 text-xs font-bold text-slate-700">
                    {item.partnersCount || 0}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
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

      {items.length === 0 && (
        <div className="px-6 py-20 text-center">
          <Landmark
            size={34}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-black text-slate-800">
            Nenhuma informação financeira encontrada
          </h3>

          <p className="mt-2 text-sm text-slate-500 font-medium">
            Adicione uma configuração ou altere os filtros.
          </p>
        </div>
      )}

      <footer className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            Itens por página
          </span>

          <select
            value={pageSize}
            onChange={(event) =>
              onPageSizeChange(
                Number(event.target.value)
              )
            }
            className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">
            {first} a {last} de {totalItems}
          </span>

          <button
            type="button"
            disabled={page <= 1}
            onClick={() =>
              onPageChange(page - 1)
            }
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
            onClick={() =>
              onPageChange(page + 1)
            }
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default FinancialInformationTable;
