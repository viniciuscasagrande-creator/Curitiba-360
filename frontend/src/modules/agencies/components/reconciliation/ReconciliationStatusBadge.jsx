import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function ReconciliationStatusBadge({ status }) {
  const norm = (status || '').toLowerCase();

  const config = {
    conciliado: {
      label: 'Conciliado',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      dot: 'bg-emerald-500',
      icon: CheckCircle2
    },
    pendente: {
      label: 'Pendente',
      bg: 'bg-amber-50 text-amber-700 border-amber-200/60',
      dot: 'bg-amber-500',
      icon: Clock
    },
    divergente: {
      label: 'Divergência',
      bg: 'bg-red-50 text-red-700 border-red-200/60',
      dot: 'bg-red-500',
      icon: AlertTriangle
    }
  };

  const current = config[norm] || {
    label: status || 'Pendente',
    bg: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-400',
    icon: Clock
  };

  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs transition-all ${current.bg}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
      <Icon className="w-3.5 h-3.5" />
      <span>{current.label}</span>
    </span>
  );
}
