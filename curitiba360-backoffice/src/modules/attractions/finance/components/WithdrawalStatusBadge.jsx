import {
  Ban,
  CheckCircle2,
  Clock3,
  FileCheck2,
  SearchCheck,
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
    icon: FileCheck2,
    className: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  },
  Pago: {
    icon: CheckCircle2,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  Cancelado: {
    icon: Ban,
    className: 'border-rose-200 bg-rose-50 text-rose-700',
  },
};

export default function WithdrawalStatusBadge({ status }) {
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
