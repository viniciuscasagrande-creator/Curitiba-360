import { ShieldCheck, XCircle } from 'lucide-react';

export default function BulkActionBar({
  selectedCount,
  onApprove,
  onReject,
  onClear,
}) {
  if (!selectedCount) return null;

  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-5 py-3 text-white shadow-lg animate-in fade-in">
      <span className="text-xs font-black">
        {selectedCount} item(ns) selecionado(s)
      </span>

      <div className="flex items-center gap-2">
        {onApprove && (
          <button
            type="button"
            onClick={onApprove}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-black hover:bg-emerald-500 transition"
          >
            <ShieldCheck size={15} />
            Aprovar Selecionados
          </button>
        )}

        {onReject && (
          <button
            type="button"
            onClick={onReject}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-rose-600 px-4 text-xs font-black hover:bg-rose-500 transition"
          >
            <XCircle size={15} />
            Rejeitar Selecionados
          </button>
        )}

        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-9 items-center px-3 text-xs font-bold text-slate-400 hover:text-white"
          >
            Limpar Seleção
          </button>
        )}
      </div>
    </div>
  );
}
