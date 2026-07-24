import {
  CalendarClock,
  CircleOff,
  CirclePause,
  Radio,
} from 'lucide-react';

import {
  AGENT_AVAILABILITY,
  AGENT_AVAILABILITY_LABELS,
} from '../constants';

const AVAILABILITY_CONFIGURATION = {
  [AGENT_AVAILABILITY.AVAILABLE]: {
    icon: Radio,
    dotClassName:
      'bg-emerald-500',
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-700',
  },

  [AGENT_AVAILABILITY.UNAVAILABLE]: {
    icon: CircleOff,
    dotClassName:
      'bg-slate-400',
    className:
      'border-slate-200 bg-slate-100 text-slate-600',
  },

  [AGENT_AVAILABILITY.BUSY]: {
    icon: CalendarClock,
    dotClassName:
      'bg-amber-500',
    className:
      'border-amber-200 bg-amber-50 text-amber-700',
  },

  [AGENT_AVAILABILITY.VACATION]: {
    icon: CirclePause,
    dotClassName:
      'bg-purple-500',
    className:
      'border-purple-200 bg-purple-50 text-purple-700',
  },
};

export function AgentAvailabilityBadge({
  availability,
  compact = false,
  showIcon = false,
}) {
  const configuration =
    AVAILABILITY_CONFIGURATION[
      availability
    ] || {
      icon: CircleOff,
      dotClassName:
        'bg-slate-400',
      className:
        'border-slate-200 bg-slate-50 text-slate-600',
    };

  const Icon =
    configuration.icon;

  const label =
    AGENT_AVAILABILITY_LABELS[
      availability
    ] || 'Não informado';

  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-600"
        title={label}
      >
        <span
          className={[
            'h-2 w-2 rounded-full',
            configuration.dotClassName,
          ].join(' ')}
        />

        {label}
      </span>
    );
  }

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5',
        'rounded-full border',
        'px-2.5 py-1',
        'text-xs font-semibold',
        configuration.className,
      ].join(' ')}
    >
      {showIcon ? (
        <Icon size={13} />
      ) : (
        <span
          className={[
            'h-1.5 w-1.5 rounded-full',
            configuration.dotClassName,
          ].join(' ')}
        />
      )}

      {label}
    </span>
  );
}

export default AgentAvailabilityBadge;
