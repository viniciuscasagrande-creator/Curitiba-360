import React from 'react';
import { DollarSign, Clock } from 'lucide-react';

export default function CurrencyExchangeCard({ taxas = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-purple-600" /> Cotação de Câmbio & Conversões em Tempo Real
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Taxas de Hoje</span>
      </div>

      <div className="space-y-2">
        {taxas.map((t, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 font-mono">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="text-purple-900">{t.par}</span>
              <span className="text-slate-800">R$ {t.taxa.toFixed(2)}</span>
            </div>
            <div className="text-[9px] text-slate-400 font-sans flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Atualizado: {t.dataAtualizacao}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
