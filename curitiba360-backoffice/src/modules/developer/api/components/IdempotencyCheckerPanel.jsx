import React from 'react';
import { Key, ShieldCheck, Database } from 'lucide-react';

export default function IdempotencyCheckerPanel({ store = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Key className="w-3.5 h-3.5 text-purple-600" /> Inspetor de Idempotência (`Idempotency-Key`)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{store.length} chaves ativas em cache</span>
      </div>

      <div className="space-y-2">
        {store.map((item, idx) => (
          <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between font-mono text-[10px]">
            <div>
              <div className="font-bold text-purple-900">{item.key}</div>
              <div className="text-slate-500 font-sans">Pedido: {item.orderId}</div>
            </div>
            <span className="text-slate-400">{item.processadoEm}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
