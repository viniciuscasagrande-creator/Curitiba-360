import React from 'react';
import {
  Pencil,
  RotateCcw,
  Trash2,
  X,
  XCircle
} from 'lucide-react';

export function CommercialBulkActions({
  selectedCount,
  statusTab,
  onEdit,
  onActivate,
  onDeactivate,
  onDelete,
  onClear
}) {
  if (!selectedCount) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 lg:flex-row lg:items-center text-left">
      <strong className="text-sm text-emerald-950 lg:mr-auto">
        {selectedCount}{' '}
        {selectedCount === 1
          ? 'item selecionado'
          : 'itens selecionados'}
      </strong>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={selectedCount !== 1}
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Pencil size={15} />
          Editar
        </button>

        {statusTab === 'inactive' ? (
          <button
            type="button"
            onClick={onActivate}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
          >
            <RotateCcw size={15} />
            Reativar
          </button>
        ) : (
          <button
            type="button"
            onClick={onDeactivate}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50"
          >
            <XCircle size={15} />
            Inativar
          </button>
        )}

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50"
        >
          <Trash2 size={15} />
          Excluir
        </button>

        <button
          type="button"
          onClick={onClear}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-emerald-700 hover:bg-emerald-100"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}

export default CommercialBulkActions;
