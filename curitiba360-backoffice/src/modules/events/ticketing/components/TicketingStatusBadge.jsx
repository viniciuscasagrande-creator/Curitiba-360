import React from 'react';
import { CheckCircle2, Clock, Flame, PauseCircle } from 'lucide-react';

export default function TicketingStatusBadge({ status = 'ativo' }) {
  const norm = (status || '').toLowerCase().trim();

  const config = {
    ativo: { label: 'Ativo / Em Venda', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle2 },
    agendado: { label: 'Agendado', bg: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock },
    esgotado: { label: 'Esgotado', bg: 'bg-red-100 text-red-800 border-red-200', icon: Flame },
    pausado: { label: 'Pausado', bg: 'bg-amber-100 text-amber-800 border-amber-200', icon: PauseCircle }
  };

  const current = config[norm] || {
    label: status,
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: CheckCircle2
  };

  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border shadow-2xs ${current.bg}`}>
      <Icon className="w-3 h-3" />
      <span>{current.label}</span>
    </span>
  );
}
