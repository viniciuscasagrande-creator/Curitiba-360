import React from 'react';
import { Edit, UserX, Trash2, UserCheck, X } from 'lucide-react';

export function BulkActionBar({
  selectedCount,
  onClearSelection,
  onEdit,
  onDeactivate,
  onActivate,
  onDelete,
  activeTab = 'todos'
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-2xl bg-slate-950 px-5 py-3 text-white shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
          {selectedCount}
        </span>
        <span className="text-xs font-bold text-slate-300">
          {selectedCount === 1 ? 'item selecionado' : 'itens selecionados'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {selectedCount === 1 && onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition"
          >
            <Edit size={14} />
            Editar
          </button>
        )}

        {onDeactivate && activeTab !== 'inativos' && (
          <button
            type="button"
            onClick={onDeactivate}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition border border-amber-500/30"
          >
            <UserX size={14} />
            Inativar Selecionados
          </button>
        )}

        {onActivate && activeTab === 'inativos' && (
          <button
            type="button"
            onClick={onActivate}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition border border-emerald-500/30"
          >
            <UserCheck size={14} />
            Reativar Selecionados
          </button>
        )}

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-xl bg-rose-500/20 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/30 transition border border-rose-500/30"
          >
            <Trash2 size={14} />
            Excluir
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onClearSelection}
        title="Cancelar seleção"
        className="ml-2 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default BulkActionBar;
