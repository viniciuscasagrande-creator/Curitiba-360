import {
  Ban,
  CheckCircle2,
  CircleOff,
  RotateCcw,
  Trash2,
  X,
  XCircle,
} from 'lucide-react';

function ActionButton({
  children,
  icon: Icon,
  onClick,
  disabled,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center gap-2 rounded-lg px-3 py-2',
        'text-sm font-medium transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',

        danger
          ? [
              'text-red-700',
              'hover:bg-red-50',
              'dark:text-red-400',
              'dark:hover:bg-red-950/40',
            ].join(' ')
          : [
              'text-slate-700',
              'hover:bg-slate-100',
              'dark:text-slate-200',
              'dark:hover:bg-slate-800',
            ].join(' '),
      ].join(' ')}
    >
      <Icon size={16} />

      {children}
    </button>
  );
}

export function AgencyBulkActions({
  selectedCount = 0,
  isProcessing = false,
  processingAction = null,

  onApprove,
  onReject,
  onSuspend,
  onInactivate,
  onReactivate,
  onDelete,
  onClearSelection,
  onClear,
}) {
  const handleClear = onClearSelection || onClear;

  if (selectedCount === 0) {
    return null;
  }

  function getLabel(
    action,
    defaultLabel,
    processingLabel,
  ) {
    if (
      isProcessing &&
      processingAction === action
    ) {
      return processingLabel;
    }

    return defaultLabel;
  }

  return (
    <div
      className={[
        'flex flex-col gap-3 rounded-xl border text-left',
        'border-slate-200 bg-white p-3 shadow-sm',
        'dark:border-slate-800 dark:bg-slate-900',
        'lg:flex-row lg:items-center lg:justify-between',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            'flex h-9 min-w-9 items-center justify-center',
            'rounded-lg bg-blue-50 px-2',
            'text-sm font-semibold text-blue-700',
            'dark:bg-blue-950/50 dark:text-blue-300',
          ].join(' ')}
        >
          {selectedCount}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {selectedCount}{' '}
            {selectedCount === 1
              ? 'agência selecionada'
              : 'agências selecionadas'}
          </p>

          <p className="text-xs text-slate-500">
            Escolha uma ação para aplicar aos registros.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <ActionButton
          icon={CheckCircle2}
          onClick={onApprove}
          disabled={isProcessing}
        >
          {getLabel(
            'approve',
            'Aprovar',
            'Aprovando...',
          )}
        </ActionButton>

        <ActionButton
          icon={XCircle}
          onClick={onReject}
          disabled={isProcessing}
        >
          {getLabel(
            'reject',
            'Rejeitar',
            'Rejeitando...',
          )}
        </ActionButton>

        <ActionButton
          icon={Ban}
          onClick={onSuspend}
          disabled={isProcessing}
        >
          {getLabel(
            'suspend',
            'Suspender',
            'Suspendendo...',
          )}
        </ActionButton>

        <ActionButton
          icon={CircleOff}
          onClick={onInactivate}
          disabled={isProcessing}
        >
          {getLabel(
            'inactivate',
            'Inativar',
            'Inativando...',
          )}
        </ActionButton>

        <ActionButton
          icon={RotateCcw}
          onClick={onReactivate}
          disabled={isProcessing}
        >
          {getLabel(
            'reactivate',
            'Reativar',
            'Reativando...',
          )}
        </ActionButton>

        <ActionButton
          icon={Trash2}
          onClick={onDelete}
          disabled={isProcessing}
          danger
        >
          {getLabel(
            'remove',
            'Excluir',
            'Excluindo...',
          )}
        </ActionButton>

        <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block dark:bg-slate-700" />

        <ActionButton
          icon={X}
          onClick={handleClear}
          disabled={isProcessing}
        >
          Limpar seleção
        </ActionButton>
      </div>
    </div>
  );
}

export default AgencyBulkActions;
