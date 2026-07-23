import React from 'react';
import { Ticket, AlertCircle } from 'lucide-react';
import TicketQuantity from './TicketQuantity';

export function TicketLotCard({ lot, selectedQuantity = 0, onAdd, onRemove, serviceFeePct = 10, limitPerBuyer = 6 }) {
  const isEsgotado = lot.status === 'esgotado' || (lot.qtdTotal - lot.qtdVendida) <= 0;
  const available = Math.max(0, lot.qtdTotal - lot.qtdVendida);
  const taxAmount = (lot.preco * serviceFeePct) / 100;

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isEsgotado
          ? 'bg-slate-950/60 border-slate-950 opacity-60'
          : selectedQuantity > 0
          ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/5'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Informações do Lote */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-100">{lot.nome}</h4>
            {isEsgotado ? (
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                Esgotado
              </span>
            ) : (
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {available} disponíveis
              </span>
            )}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>+ R$ {taxAmount.toFixed(2)} ({serviceFeePct}% taxa de conveniência)</span>
            <span>•</span>
            <span>Limite de {limitPerBuyer} por CPF</span>
          </div>
        </div>

        {/* Preço e Seleção */}
        <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          <div className="text-left sm:text-right">
            <span className="text-xl font-extrabold text-amber-400 block">
              R$ {lot.preco.toFixed(2)}
            </span>
          </div>

          {!isEsgotado && (
            <TicketQuantity
              quantity={selectedQuantity}
              onAdd={() => onAdd(lot.id)}
              onRemove={() => onRemove(lot.id)}
              disabledAdd={available <= selectedQuantity}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default TicketLotCard;
