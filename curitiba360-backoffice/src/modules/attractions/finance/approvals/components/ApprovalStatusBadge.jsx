import {
  Ban,
  CheckCircle2,
  Clock3,
  SearchCheck,
  ShieldCheck,
  XCircle,
} from 'lucide-react';

const STATUS_CONFIG = {
  Pendente: {
    icon: Clock3,
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  'Em análise': {
    icon: SearchCheck,
    className: 'border-blue-200 bg-blue-50 text-blue-700',
  },
  Aprovado: {
    icon: ShieldCheck,
    className: 'border-violet-200 bg-violet-50 text-violet-700',
  },
  Pago: {
    icon: CheckCircle2,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  Rejeitado: {
    icon: XCircle,
    className: 'border-rose-200 bg-rose-50 text-rose-700',
  },
  Cancelado: {
    icon: Ban,
    className: 'border-slate-200 bg-slate-100 text-slate-600',
  },
};

export default function ApprovalStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.Pendente;
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
