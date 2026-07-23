import React from 'react';
import {
  Pencil,
  RotateCcw,
  Trash2,
  UserX,
  X
} from 'lucide-react';

export function UsersBulkActions({
  selectedCount,
  currentTab,
  onEdit,
  onActivate,
  onDeactivate,
  onDelete,
  onClear
}) {
  if (!selectedCount) {
    return null;
  }

  const inactiveTab = currentTab === 'inactive';

  return (
    <div className="animate-fade-in flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 sm:flex-row sm:items-center text-left">
      <div className="flex items-center justify-between gap-3 sm:mr-auto">
        <strong className="text-sm text-emerald-950">
          {selectedCount}{' '}
          {selectedCount === 1
            ? 'usuário selecionado'
            : 'usuários selecionados'}
        </strong>

        <button
          type="button"
          onClick={onClear}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-emerald-700 hover:bg-emerald-100 sm:hidden"
          aria-label="Limpar seleção"
        >
          <X size={17} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onEdit}
          disabled={selectedCount !== 1}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Pencil size={15} />
          Editar
        </button>

        {inactiveTab ? (
          <button
            type="button"
            onClick={onActivate}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
          >
            <RotateCcw size={15} />
            Reativar
          </button>
        ) : (
          <button
            type="button"
            onClick={onDeactivate}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-50"
          >
            <UserX size={15} />
            Inativar
          </button>
        )}

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-50"
        >
          <Trash2 size={15} />
          Excluir
        </button>

        <button
          type="button"
          onClick={onClear}
          className="hidden h-9 w-9 items-center justify-center rounded-xl text-emerald-700 hover:bg-emerald-100 sm:flex"
          aria-label="Limpar seleção"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}

export default UsersBulkActions;
