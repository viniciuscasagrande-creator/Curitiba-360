import {
  Ban,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  PauseCircle,
  UserX,
} from 'lucide-react';

import {
  AGENT_STATUS,
  AGENT_STATUS_LABELS,
} from '../constants';

const STATUS_STYLES = {
  [AGENT_STATUS.ACTIVE]: {
    icon: CheckCircle2,
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-700',
  },

  [AGENT_STATUS.INACTIVE]: {
    icon: UserX,
    className:
      'border-slate-200 bg-slate-100 text-slate-600',
  },

  [AGENT_STATUS.PENDING]: {
    icon: Clock3,
    className:
      'border-amber-200 bg-amber-50 text-amber-700',
  },

  [AGENT_STATUS.SUSPENDED]: {
    icon: Ban,
    className:
      'border-red-200 bg-red-50 text-red-700',
  },

  [AGENT_STATUS.ON_EVENT]: {
    icon: CalendarCheck,
    className:
      'border-blue-200 bg-blue-50 text-blue-700',
  },

  [AGENT_STATUS.ON_LEAVE]: {
    icon: PauseCircle,
    className:
      'border-purple-200 bg-purple-50 text-purple-700',
  },
};

export function AgentStatusBadge({
  status,
  showIcon = true,
  size = 'default',
}) {
  const configuration =
    STATUS_STYLES[status] || {
      icon: Clock3,
      className:
        'border-slate-200 bg-slate-50 text-slate-600',
    };

  const Icon =
    configuration.icon;

  return (
    <span
      className={[
        'inline-flex items-center',
        'rounded-full border',
        'font-semibold',
        configuration.className,

        size === 'small'
          ? 'gap-1 px-2 py-0.5 text-[11px]'
          : 'gap-1.5 px-2.5 py-1 text-xs',
      ].join(' ')}
    >
      {showIcon && (
        <Icon
          size={
            size === 'small'
              ? 12
              : 14
          }
        />
      )}

      {AGENT_STATUS_LABELS[
        status
      ] || 'Não informado'}
    </span>
  );
}

export default AgentStatusBadge;
