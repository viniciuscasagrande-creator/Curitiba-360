import {
  Ban,
  CheckCircle2,
  Clock3,
  FileClock,
  PauseCircle,
  XCircle,
} from 'lucide-react';

const statusConfiguration = {
  Ativa: {
    icon: CheckCircle2,
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-700',
  },

  'Aguardando Contrato': {
    icon: FileClock,
    className:
      'border-amber-200 bg-amber-50 text-amber-700',
  },

  'Pendente de Aprovação': {
    icon: Clock3,
    className:
      'border-blue-200 bg-blue-50 text-blue-700',
  },

  Suspensa: {
    icon: PauseCircle,
    className:
      'border-orange-200 bg-orange-50 text-orange-700',
  },

  Inativa: {
    icon: Ban,
    className:
      'border-slate-200 bg-slate-100 text-slate-600',
  },

  Rejeitada: {
    icon: XCircle,
    className:
      'border-red-200 bg-red-50 text-red-700',
  },
};

export default function AgencyStatusBadge({
  status,
}) {
  const configuration =
    statusConfiguration[status] ?? {
      icon: Clock3,
      className:
        'border-slate-200 bg-slate-100 text-slate-600',
    };

  const Icon = configuration.icon;

  return (
    <span
      className={[
        'inline-flex min-w-max items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black',
        configuration.className,
      ].join(' ')}
    >
      <Icon size={12} />

      {status}
    </span>
  );
}
