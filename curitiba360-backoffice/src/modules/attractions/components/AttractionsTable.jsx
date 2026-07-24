import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MapPin,
  Sparkles,
  Ticket,
  Pencil,
  Trash2
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { operationTypeLabels } from '../data/attractionsMock';

export function AttractionsTable({
  attractions,
  selectedIds,
  page,
  pageSize,
  totalItems,
  onToggle,
  onToggleAll,
  onEdit,
  onDelete,
  onPageChange,
  onPageSizeChange
}) {
  const navigate = useNavigate();

  const allSelected =
    attractions.length > 0 &&
    attractions.every((item) => selectedIds.includes(item.id));

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const first = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, totalItems);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm text-left">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
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
                'ID da atração',
                'Nome',
                'Parceiro comercial',
                'Data de criação',
                'Status'
              ].map((label) => (
                <th
                  key={label}
                  className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500"
                >
                  {label}
                </th>
              ))}

              <th className="w-24 px-4 py-4 text-right text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {attractions.map((attraction) => {
              const selected = selectedIds.includes(attraction.id);

              return (
                <tr
                  key={attraction.id}
                  className={[
                    'border-t border-slate-100 transition',
                    selected ? 'bg-emerald-50/50' : 'hover:bg-slate-50'
                  ].join(' ')}
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onToggle(attraction.id)}
                      className="h-4 w-4 accent-emerald-600 cursor-pointer"
                    />
                  </td>

                  <td className="px-4 py-4 text-xs font-semibold text-slate-600 font-mono">
                    {attraction.id}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/atracoes/${attraction.id}/categorias`)}
                      className="flex items-center gap-3 text-left group"
                    >
                      {attraction.mainImage ? (
                        <img
                          src={attraction.mainImage}
                          alt={attraction.general?.name}
                          className="h-10 w-10 rounded-2xl object-cover border border-slate-200 group-hover:border-emerald-500 transition"
                        />
                      ) : (
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 font-bold">
                          <Sparkles size={18} />
                        </span>
                      )}

                      <div>
                        <strong className="block text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                          {attraction.general?.name}
                        </strong>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <MapPin size={12} className="text-slate-400" />
                          {attraction.general?.city || 'Curitiba'}, {attraction.general?.state || 'PR'}
                        </span>
                      </div>
                    </button>
                  </td>

                  <td className="px-4 py-4 text-xs font-bold text-slate-800">
                    {attraction.partnerName}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-500 font-medium">
                    {new Intl.DateTimeFormat('pt-BR').format(new Date(attraction.createdAt || Date.now()))}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={attraction.status} type="attraction" />
                  </td>

                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title="Ver Categorias de Ingressos"
                        onClick={() => navigate(`/admin/atracoes/${attraction.id}/categorias`)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 transition"
                      >
                        <Ticket size={16} />
                      </button>

                      <button
                        type="button"
                        title="Editar Atração"
                        onClick={() => onEdit(attraction)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {attractions.length === 0 && (
        <div className="px-6 py-16 text-center">
          <Sparkles size={34} className="mx-auto text-slate-300" />
          <h3 className="mt-4 font-black text-slate-800">Nenhuma atração encontrada</h3>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Tente alterar os filtros ou adicione uma nova atração.
          </p>
        </div>
      )}

      <footer className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Itens por página</span>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="h-9 rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-700 outline-none"
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
    </div>
  );
}

export default AttractionsTable;
