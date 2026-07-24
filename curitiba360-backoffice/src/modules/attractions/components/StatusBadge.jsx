import React from 'react';
import { attractionStatusLabels, ticketStatusLabels } from '../data/attractionsMock';

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  inactive: 'bg-slate-100 text-slate-500 border-slate-200',
  draft: 'bg-purple-50 text-purple-700 border-purple-200',

  sold: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  validated: 'bg-blue-50 text-blue-700 border-blue-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  reserved: 'bg-amber-50 text-amber-700 border-amber-200',
  pending: 'bg-purple-50 text-purple-700 border-purple-200',
  expired: 'bg-slate-100 text-slate-500 border-slate-200',
  refunded: 'bg-orange-50 text-orange-700 border-orange-200',
  blocked: 'bg-red-100 text-red-800 border-red-300',
  courtesy: 'bg-teal-50 text-teal-700 border-teal-200'
};

export function StatusBadge({ status, type = 'attraction' }) {
  const label =
    type === 'ticket'
      ? ticketStatusLabels[status] || status
      : attractionStatusLabels[status] || status;

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold border',
        statusStyles[status] || 'bg-slate-100 text-slate-600 border-slate-200'
      ].join(' ')}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
