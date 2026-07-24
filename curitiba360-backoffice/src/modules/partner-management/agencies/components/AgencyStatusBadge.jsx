import { Ban, CheckCircle2, Clock, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { AGENCY_STATUS } from '../../shared/constants/partnerStatus';

const STATUS_CONFIG = {
  [AGENCY_STATUS.ACTIVE]: {
    icon: CheckCircle2,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  [AGENCY_STATUS.PENDING_APPROVAL]: {
    icon: Clock,
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  [AGENCY_STATUS.WAITING_CONTRACT]: {
    icon: AlertTriangle,
    className: 'border-blue-200 bg-blue-50 text-blue-700',
  },
  [AGENCY_STATUS.SUSPENDED]: {
    icon: Ban,
    className: 'border-rose-200 bg-rose-50 text-rose-700',
  },
  [AGENCY_STATUS.INACTIVE]: {
    icon: XCircle,
    className: 'border-slate-200 bg-slate-100 text-slate-600',
  },
  [AGENCY_STATUS.REJECTED]: {
    icon: XCircle,
    className: 'border-rose-200 bg-rose-100 text-rose-800',
  },
};

export default function AgencyStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG[AGENCY_STATUS.ACTIVE];
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
