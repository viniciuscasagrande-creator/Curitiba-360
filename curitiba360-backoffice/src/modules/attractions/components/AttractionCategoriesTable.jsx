import React from 'react';
import { MoreHorizontal, Trash2, Ticket } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export function AttractionCategoriesTable({
  categories,
  selectedIds,
  onToggle,
  onToggleAll,
  onEdit,
  onDelete
}) {
  const allSelected =
    categories.length > 0 &&
    categories.every((item) => selectedIds.includes(item.id));

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm text-left">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
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

              <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                ID
              </th>
              <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                Categoria
              </th>
              <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                Preço Padrão
              </th>
              <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                Quantidade
              </th>
              <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                Status
              </th>
              <th className="w-20 px-4 py-4 text-right text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => {
              const selected = selectedIds.includes(category.id);

              return (
                <tr
                  key={category.id}
                  className={[
                    'border-t border-slate-100 hover:bg-slate-50 transition',
                    selected ? 'bg-emerald-50/50' : ''
                  ].join(' ')}
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onToggle(category.id)}
                      className="h-4 w-4 accent-emerald-600 cursor-pointer"
                    />
                  </td>

                  <td className="px-4 py-4 text-xs font-semibold text-slate-600 font-mono">
                    {category.id}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onEdit(category)}
                      className="text-left"
                    >
                      <strong className="block text-sm font-bold text-slate-900 hover:text-emerald-700">
                        {category.name}
                      </strong>
                      {category.description && (
                        <span className="text-xs text-slate-500 font-medium block">
                          {category.description}
                        </span>
                      )}
                    </button>
                  </td>

                  <td className="px-4 py-4 text-sm font-black text-slate-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(category.price)}
                  </td>

                  <td className="px-4 py-4 text-xs font-bold text-slate-700">
                    {category.quantity} un.
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={category.status} type="attraction" />
                  </td>

                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(category)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(category)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-rose-500 hover:bg-rose-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttractionCategoriesTable;
