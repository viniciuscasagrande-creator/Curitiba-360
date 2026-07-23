import React from 'react';
import {
  Download,
  FileSignature,
  Pencil,
  RotateCcw,
  Trash2,
  X,
  XCircle
} from 'lucide-react';

export function ContractsBulkActions({
  selectedCount,
  currentTab,
  onSendSignature,
  onDownload,
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
    <div className="animate-fade-in flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 xl:flex-row xl:items-center text-left">
      <div className="flex items-center justify-between gap-4 xl:mr-auto">
        <strong className="text-sm text-emerald-950">
          {selectedCount}{' '}
          {selectedCount === 1
            ? 'contrato selecionado'
            : 'contratos selecionados'}
        </strong>

        <button
          type="button"
          onClick={onClear}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-emerald-700 hover:bg-emerald-100 xl:hidden"
        >
          <X size={17} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onSendSignature}
          className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-3 py-2 text-xs font-bold text-violet-700 hover:bg-violet-50"
        >
          <FileSignature size={15} />
          Enviar DocuSign
        </button>

        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          <Download size={15} />
          Download PDF
        </button>

        <button
          type="button"
          onClick={onEdit}
          disabled={selectedCount !== 1}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Pencil size={15} />
          Editar
        </button>

        {currentTab === 'inactive' ? (
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
          className="hidden h-9 w-9 items-center justify-center rounded-xl text-emerald-700 hover:bg-emerald-100 xl:flex"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}

export default ContractsBulkActions;
