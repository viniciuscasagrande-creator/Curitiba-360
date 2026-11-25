import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react';

export function TransactionStatus({ status }) {
  switch (status) {
    case 'approved':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 size={12} />
          Aprovado
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <Clock size={12} />
          Pendente
        </span>
      );
    case 'cancelled':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <XCircle size={12} />
          Cancelado
        </span>
      );
    case 'failed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <AlertTriangle size={12} />
          Falhou
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-slate-800 text-slate-400">
          {status}
        </span>
      );
  }
}
export default TransactionStatus;
