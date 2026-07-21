import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';

export default function AgencyStatusBadge({ status }) {
  const normalizedStatus = (status || '').toLowerCase();

  const config = {
    ativo: {
      label: 'Ativa',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      dot: 'bg-emerald-500',
      icon: CheckCircle2
    },
    pendente: {
      label: 'Aguardando Contrato',
      bg: 'bg-amber-50 text-amber-700 border-amber-200/60',
      dot: 'bg-amber-500',
      icon: Clock
    },
    suspenso: {
      label: 'Suspenso',
      bg: 'bg-orange-50 text-orange-700 border-orange-200/60',
      dot: 'bg-orange-500',
      icon: AlertTriangle
    },
    inativo: {
      label: 'Inativa',
      bg: 'bg-slate-100 text-slate-600 border-slate-200',
      dot: 'bg-slate-400',
      icon: XCircle
    }
  };

  const current = config[normalizedStatus] || {
    label: status || 'Desconhecido',
    bg: 'bg-gray-100 text-gray-700 border-gray-200',
    dot: 'bg-gray-400',
    icon: Clock
  };

  const IconComponent = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-2xs transition-all ${current.bg}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
      <IconComponent className="w-3.5 h-3.5" />
      <span>{current.label}</span>
    </span>
  );
}
