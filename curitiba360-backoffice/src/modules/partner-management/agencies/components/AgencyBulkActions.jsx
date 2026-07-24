import {
  Ban,
  CheckCircle2,
  PauseCircle,
  Trash2,
  X,
  XCircle,
} from 'lucide-react';

export default function AgencyBulkActions({
  selectedCount,
  activeStatus,
  disabled = false,
  onApprove,
  onReject,
  onSuspend,
  onInactivate,
  onDelete,
  onClear,
}) {
  if (!selectedCount) {
    return null;
  }

  const pendingMode =
    activeStatus ===
    'Pendente de Aprovação';

  return (
    <section className="flex flex-col gap-4 rounded-[22px] border border-slate-200 bg-slate-900 px-5 py-4 shadow-lg shadow-slate-900/10 lg:flex-row lg:items-center lg:justify-between text-left">
      <div className="flex items-center gap-3">
        <span className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-white px-3 text-xs font-black text-slate-900">
          {selectedCount}
        </span>

        <div>
          <strong className="block text-xs font-black text-white">
            Agência(s) selecionada(s)
          </strong>

          <span className="text-[10px] font-bold text-slate-400">
            Escolha uma ação para os
            registros selecionados.
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {pendingMode ? (
          <>
            <BulkButton
              icon={CheckCircle2}
              label="Aprovar"
              disabled={disabled}
              onClick={onApprove}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            />

            <BulkButton
              icon={XCircle}
              label="Rejeitar"
              disabled={disabled}
              onClick={onReject}
              className="bg-red-500 text-white hover:bg-red-600"
            />
          </>
        ) : (
          <>
            <BulkButton
              icon={PauseCircle}
              label="Suspender"
              disabled={disabled}
              onClick={onSuspend}
            />

            <BulkButton
              icon={Ban}
              label="Inativar"
              disabled={disabled}
              onClick={onInactivate}
            />

            <BulkButton
              icon={Trash2}
              label="Excluir"
              disabled={disabled}
              onClick={onDelete}
              className="text-red-200 hover:bg-red-500/20 hover:text-red-100"
            />
          </>
        )}

        <button
          type="button"
          title="Limpar seleção"
          onClick={onClear}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </section>
  );
}

function BulkButton({
  icon: Icon,
  label,
  disabled,
  onClick,
  className = '',
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        'inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-xs font-black text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40',
        className,
      ].join(' ')}
    >
      <Icon size={15} />

      {label}
    </button>
  );
}
