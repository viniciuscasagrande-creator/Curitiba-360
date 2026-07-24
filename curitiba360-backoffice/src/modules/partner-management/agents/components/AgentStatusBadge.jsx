import { CheckCircle2, Clock, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
  Ativo: {
    icon: CheckCircle2,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  Pendente: {
    icon: Clock,
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  Inativo: {
    icon: XCircle,
    className: 'border-slate-200 bg-slate-100 text-slate-600',
  },
};

export default function AgentStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.Ativo;
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
