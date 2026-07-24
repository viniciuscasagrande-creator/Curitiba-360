import {
  CheckCircle2,
  Cloud,
  CloudOff,
  LoaderCircle,
  RefreshCw,
  TriangleAlert,
  Wifi,
} from 'lucide-react';

const STATUS_CONFIG = {
  idle: {
    label: 'Realtime desativado',
    icon: CloudOff,
    className:
      'border-slate-200 bg-slate-50 text-slate-600',
  },

  connecting: {
    label: 'Conectando',
    icon: LoaderCircle,
    className:
      'border-blue-200 bg-blue-50 text-blue-700',
  },

  connected: {
    label: 'Sincronizado',
    icon: CheckCircle2,
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-700',
  },

  syncing: {
    label: 'Sincronizando',
    icon: RefreshCw,
    className:
      'border-amber-200 bg-amber-50 text-amber-700',
  },

  offline: {
    label: 'Sem conexão',
    icon: CloudOff,
    className:
      'border-orange-200 bg-orange-50 text-orange-700',
  },

  error: {
    label: 'Erro de sincronização',
    icon: TriangleAlert,
    className:
      'border-red-200 bg-red-50 text-red-700',
  },

  stopped: {
    label: 'Sincronização pausada',
    icon: Cloud,
    className:
      'border-slate-200 bg-slate-50 text-slate-600',
  },
};

function formatSyncTime(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(
    'pt-BR',
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
  ).format(date);
}

export function AgencyRealtimeStatus({
  status = 'idle',
  isFromCache = false,
  hasPendingWrites = false,
  lastSyncedAt = null,
  onRestart,
}) {
  const config =
    STATUS_CONFIG[status] ||
    STATUS_CONFIG.idle;

  const Icon = config.icon;

  const syncTime =
    formatSyncTime(
      lastSyncedAt,
    );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        className={[
          'inline-flex items-center gap-2',
          'rounded-full border px-3 py-1.5',
          'text-xs font-semibold',
          config.className,
        ].join(' ')}
      >
        <Icon
          size={14}
          className={
            status === 'connecting' ||
            status === 'syncing'
              ? 'animate-spin'
              : ''
          }
        />

        <span>{config.label}</span>
      </div>

      {isFromCache && (
        <div
          className={[
            'inline-flex items-center gap-1.5',
            'rounded-full border border-slate-200',
            'bg-white px-2.5 py-1.5',
            'text-xs text-slate-600',
          ].join(' ')}
        >
          <CloudOff size={13} />
          Dados locais
        </div>
      )}

      {hasPendingWrites && (
        <div
          className={[
            'inline-flex items-center gap-1.5',
            'rounded-full border border-amber-200',
            'bg-amber-50 px-2.5 py-1.5',
            'text-xs text-amber-700',
          ].join(' ')}
        >
          <RefreshCw
            size={13}
            className="animate-spin"
          />

          Alterações pendentes
        </div>
      )}

      {status === 'connected' &&
        !hasPendingWrites && (
          <div
            className={[
              'inline-flex items-center gap-1.5',
              'text-xs text-slate-500',
            ].join(' ')}
          >
            <Wifi size={13} />

            {syncTime
              ? `Atualizado às ${syncTime}`
              : 'Atualização em tempo real'}
          </div>
        )}

      {(status === 'error' ||
        status === 'stopped') &&
        onRestart && (
          <button
            type="button"
            onClick={onRestart}
            className={[
              'inline-flex items-center gap-1.5',
              'rounded-lg border border-slate-200',
              'bg-white px-2.5 py-1.5',
              'text-xs font-medium text-slate-700',
              'hover:bg-slate-50',
            ].join(' ')}
          >
            <RefreshCw size={13} />
            Reconectar
          </button>
        )}
    </div>
  );
}

export default AgencyRealtimeStatus;
