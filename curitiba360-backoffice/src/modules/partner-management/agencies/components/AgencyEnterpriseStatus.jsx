import {
  CircleCheck,
  CloudOff,
  RefreshCw,
  Radio,
  RotateCcw,
} from 'lucide-react';

export function AgencyEnterpriseStatus({
  realtimeStatus,
  isConnected,
  isFromCache,
  hasPendingWrites,
  crossTabConnected,
  reconnectAttempt,
  reconnectScheduled,
  onReconnect,
}) {
  return (
    <div
      className={[
        'flex flex-wrap items-center',
        'gap-2 rounded-xl border text-left',
        'border-slate-200 bg-white',
        'px-3 py-2 shadow-sm',
      ].join(' ')}
    >
      <div
        className={[
          'inline-flex items-center gap-2',
          'rounded-full px-2.5 py-1',
          'text-xs font-semibold',

          isConnected
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-orange-50 text-orange-700',
        ].join(' ')}
      >
        {isConnected ? (
          <CircleCheck
            size={14}
          />
        ) : (
          <CloudOff
            size={14}
          />
        )}

        {isConnected
          ? 'Realtime conectado'
          : 'Realtime desconectado'}
      </div>

      {crossTabConnected && (
        <div className="inline-flex items-center gap-1.5 text-xs text-blue-700">
          <Radio size={14} />

          Multiaba ativa
        </div>
      )}

      {isFromCache && (
        <span className="text-xs text-slate-500">
          Dados do cache
        </span>
      )}

      {hasPendingWrites && (
        <div className="inline-flex items-center gap-1.5 text-xs text-amber-700">
          <RefreshCw
            size={14}
            className="animate-spin"
          />

          Sincronizando alterações
        </div>
      )}

      {reconnectScheduled && (
        <span className="text-xs text-orange-600">
          Tentativa de reconexão{' '}
          {reconnectAttempt}
        </span>
      )}

      {(realtimeStatus ===
        'error' ||
        !isConnected) && (
        <button
          type="button"
          onClick={onReconnect}
          className={[
            'inline-flex items-center gap-1.5',
            'rounded-lg border border-slate-200',
            'px-2.5 py-1.5 text-xs',
            'font-semibold text-slate-700',
            'hover:bg-slate-50',
          ].join(' ')}
        >
          <RotateCcw
            size={13}
          />

          Reconectar
        </button>
      )}
    </div>
  );
}

export default AgencyEnterpriseStatus;
