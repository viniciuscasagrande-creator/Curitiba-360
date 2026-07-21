import React from 'react';
import { CreditCard, Zap, ShieldCheck } from 'lucide-react';

export default function GatewayStatusBadge({ gateway = 'Mercado Pago', formaPagamento = 'PIX' }) {
  const isPix = formaPagamento.toUpperCase() === 'PIX';

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 border border-slate-200 text-slate-700">
      {isPix ? (
        <Zap className="w-3.5 h-3.5 text-emerald-600" />
      ) : (
        <CreditCard className="w-3.5 h-3.5 text-blue-600" />
      )}
      <span className="font-bold text-slate-800">{formaPagamento}</span>
      <span className="text-slate-400">•</span>
      <span className="text-slate-500 font-medium">{gateway}</span>
    </div>
  );
}
