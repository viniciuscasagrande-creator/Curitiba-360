import React from 'react';
import { DollarSign, CreditCard, QrCode, CheckCircle2 } from 'lucide-react';

export default function PaymentsApiPanel({ payments = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-purple-600" /> API de Pagamentos (`/v1/payments`)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{payments.length} transações</span>
      </div>

      <div className="space-y-2">
        {payments.map((p) => (
          <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="font-mono text-purple-900">{p.id} • {p.comprador}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase">
                {p.status}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Método: <b>{p.metodo}</b> • Pago em: {p.dataPagamento}</div>
            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-200/60 font-mono">
              <span className="text-slate-600">Valor Bruto: R$ {p.valor.toFixed(2)}</span>
              <span className="text-emerald-700 font-bold">Valor Líquido: R$ {p.valorLiquido.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
