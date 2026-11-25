import React from 'react';
import { Star, RefreshCw, Sparkles, AlertTriangle, UserX } from 'lucide-react';

export default function CrmSegmentBadges({ segmento = 'VIP' }) {
  const norm = (segmento || '').toLowerCase();

  const config = {
    vip: {
      label: 'VIP (Top 5%)',
      bg: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: Star
    },
    recorrente: {
      label: 'Recorrente',
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: RefreshCw
    },
    novo: {
      label: 'Novo Lead',
      bg: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Sparkles
    },
    'risco churn': {
      label: 'Risco de Churn (Inativo 90d)',
      bg: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: AlertTriangle
    },
    inativo: {
      label: 'Inativo',
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: UserX
    }
  };

  const current = config[norm] || {
    label: segmento,
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: Sparkles
  };

  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border shadow-2xs ${current.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{current.label}</span>
    </span>
  );
}
