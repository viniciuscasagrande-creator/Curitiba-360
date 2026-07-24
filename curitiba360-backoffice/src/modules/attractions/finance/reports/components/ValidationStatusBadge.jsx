import {
  Ban,
  CheckCircle2,
  Clock3,
  XCircle,
} from 'lucide-react';

const STATUS_CONFIG = {
  Validado: {
    icon: CheckCircle2,
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  Rejeitado: {
    icon: XCircle,
    className:
      'border-red-200 bg-red-50 text-red-700',
  },
  Cancelado: {
    icon: Ban,
    className:
      'border-amber-200 bg-amber-50 text-amber-700',
  },
  Expirado: {
    icon: Clock3,
    className:
      'border-slate-200 bg-slate-100 text-slate-600',
  },
};

export default function ValidationStatusBadge({
  status,
}) {
  const config =
    STATUS_CONFIG[status] ??
    STATUS_CONFIG.Expirado;

  const Icon = config.icon;

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-black',
        config.className,
      ].join(' ')}
    >
      <Icon size={12} />

      {status}
    </span>
  );
}
