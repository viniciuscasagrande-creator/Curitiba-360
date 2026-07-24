import { CheckCircle2, Clock, AlertTriangle, Ban, XCircle } from 'lucide-react';

const TONES = {
  active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  contract: 'border-blue-200 bg-blue-50 text-blue-700',
  suspended: 'border-rose-200 bg-rose-50 text-rose-700',
  inactive: 'border-slate-200 bg-slate-100 text-slate-600',
};

export default function StatusBadge({ status, tone = 'active', icon: CustomIcon }) {
  const Icon = CustomIcon || CheckCircle2;
  const toneClass = TONES[tone] || TONES.active;

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-black',
        toneClass,
      ].join(' ')}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}
