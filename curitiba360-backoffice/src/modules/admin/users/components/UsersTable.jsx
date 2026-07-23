import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ShieldCheck,
  UserRound
} from 'lucide-react';

import {
  roleLabels,
  statusLabels
} from '../data/usersMock';

const roleStyles = {
  administrator: 'bg-violet-50 text-violet-700',
  manager: 'bg-blue-50 text-blue-700',
  financial: 'bg-emerald-50 text-emerald-700',
  partner: 'bg-amber-50 text-amber-700',
  supervisor: 'bg-cyan-50 text-cyan-700',
  operator: 'bg-slate-100 text-slate-700',
  support: 'bg-pink-50 text-pink-700',
  'check-in': 'bg-orange-50 text-orange-700'
};

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700',
  inactive: 'bg-slate-100 text-slate-600',
  pending: 'bg-amber-50 text-amber-700',
  blocked: 'bg-rose-50 text-rose-700'
};

const columns = [
  { id: 'id', label: 'User ID' },
  { id: 'firstName', label: 'Nome' },
  { id: 'role', label: 'Perfil' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Data de criação' },
  { id: 'lastLoginAt', label: 'Último login' }
];

function formatDate(value) {
  if (!value) {
    return 'Nunca acessou';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(value));
}

export function UsersTable({
  users,
  selectedIds,
  sort,
  page,
  pageSize,
  totalItems,
  onToggle,
  onToggleAll,
  onSort,
  onPageChange,
  onPageSizeChange,
  onEdit
}) {
  const allSelected =
    users.length > 0 &&
    users.every((user) => selectedIds.includes(user.id));

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const firstItem =
    totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const lastItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm text-left">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-14 px-5 py-4 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                  className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
                  aria-label="Selecionar todos"
                />
              </th>

              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-4 text-left"
                >
                  <button
                    type="button"
                    onClick={() => onSort(column.id)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-slate-500 hover:text-slate-900"
                  >
                    {column.label}

                    <SortIcon
                      active={sort.field === column.id}
                      direction={sort.direction}
                    />
                  </button>
                </th>
              ))}

              <th className="w-16 px-5 py-4" />
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const selected = selectedIds.includes(user.id);

              return (
                <tr
                  key={user.id}
                  className={[
                    'border-t border-slate-100 transition',
                    selected
                      ? 'bg-emerald-50/50'
                      : 'hover:bg-slate-50/80'
                  ].join(' ')}
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onToggle(user.id)}
                      className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
                      aria-label={`Selecionar ${user.firstName}`}
                    />
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                    {user.id}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      className="flex items-center gap-3 text-left"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                        <UserRound size={20} />
                      </span>

                      <span>
                        <strong className="block text-sm text-slate-900">
                          {user.firstName} {user.lastName}
                        </strong>

                        <span className="mt-0.5 block text-xs text-slate-500 font-medium">
                          {user.email}
                        </span>

                        <span className="mt-0.5 block text-[10px] text-slate-400">
                          {user.company}
                        </span>
                      </span>
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={[
                        'inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold',
                        roleStyles[user.role] ||
                          'bg-slate-100 text-slate-700'
                      ].join(' ')}
                    >
                      {roleLabels[user.role] || user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          'inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold',
                          statusStyles[user.status]
                        ].join(' ')}
                      >
                        {statusLabels[user.status]}
                      </span>

                      {user.twoFactorEnabled && (
                        <ShieldCheck
                          size={16}
                          className="text-emerald-600"
                          aria-label="2FA ativado"
                        />
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-600 font-medium">
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-600 font-medium">
                    {formatDate(user.lastLoginAt)}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      aria-label="Abrir ações"
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="px-6 py-20 text-center">
          <UserRound
            size={32}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-black text-slate-800">
            Nenhum usuário encontrado
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Ajuste os filtros ou adicione um novo usuário.
          </p>
        </div>
      )}

      <footer className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Itens por página</span>

          <select
            value={pageSize}
            onChange={(event) =>
              onPageSizeChange(Number(event.target.value))
            }
            className="h-9 rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-700 outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="text-xs text-slate-500 font-medium">
            {firstItem} a {lastItem} de {totalItems}
          </span>

          <div className="flex gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="flex h-9 min-w-20 items-center justify-center rounded-xl bg-slate-100 px-3 text-xs font-bold text-slate-700">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SortIcon({
  active,
  direction
}) {
  if (!active) {
    return <ArrowUpDown size={14} />;
  }

  return direction === 'asc' ? (
    <ArrowUp size={14} className="text-emerald-600" />
  ) : (
    <ArrowDown size={14} className="text-emerald-600" />
  );
}

export default UsersTable;
