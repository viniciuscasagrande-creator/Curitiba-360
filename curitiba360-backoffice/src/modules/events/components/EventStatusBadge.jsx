import React from 'react';
import { CheckCircle2, Clock, Flame, FileEdit, Archive, PauseCircle, XCircle, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

export default function EventStatusBadge({ status = 'Publicado' }) {
  const norm = (status || '').toLowerCase().trim();

  const config = {
    'publicado': { label: 'Publicado', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle2 },
    'em vendas': { label: 'Em Vendas 🔥', bg: 'bg-purple-100 text-purple-800 border-purple-200', icon: Flame },
    'aprovado': { label: 'Aprovado', bg: 'bg-teal-100 text-teal-800 border-teal-200', icon: ShieldCheck },
    'em revisão': { label: 'Em Revisão ⏳', bg: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock },
    'em configuração': { label: 'Em Configuração', bg: 'bg-blue-100 text-blue-800 border-blue-200', icon: FileEdit },
    'rascunho': { label: 'Rascunho 📝', bg: 'bg-slate-100 text-slate-700 border-slate-200', icon: FileEdit },
    'pausado': { label: 'Pausado ⏸️', bg: 'bg-orange-100 text-orange-800 border-orange-200', icon: PauseCircle },
    'esgotado': { label: 'Esgotado 100%', bg: 'bg-red-100 text-red-800 border-red-200', icon: Flame },
    'realizado': { label: 'Realizado ✅', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Check },
    'encerrado': { label: 'Encerrado', bg: 'bg-gray-100 text-gray-700 border-gray-200', icon: Archive },
    'cancelado': { label: 'Cancelado 🚫', bg: 'bg-red-900 text-white border-red-700', icon: XCircle },
    'arquivado': { label: 'Arquivado', bg: 'bg-slate-200 text-slate-600 border-slate-300', icon: Archive },
    'reprovado': { label: 'Reprovado ❌', bg: 'bg-red-100 text-red-800 border-red-300', icon: AlertTriangle }
  };

  const current = config[norm] || {
    label: status,
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: CheckCircle2
  };

  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border shadow-2xs ${current.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{current.label}</span>
    </span>
  );
}
