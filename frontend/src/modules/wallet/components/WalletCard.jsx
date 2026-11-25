import React from 'react';
import { CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';

export function WalletCard({ card, onSelect, selected = false }) {
  return (
    <div
      onClick={onSelect}
      className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between h-40 shadow-lg relative overflow-hidden ${
        selected
          ? 'bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border-amber-500 shadow-amber-500/10'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-sm uppercase tracking-wider text-amber-400">
          {card.brand}
        </span>
        {card.isDefault && (
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Principal
          </span>
        )}
      </div>

      <div className="space-y-1">
        <span className="text-sm font-mono text-slate-300 block tracking-widest">
          •••• •••• •••• {card.last4}
        </span>
        <span className="text-xs text-slate-400 block uppercase font-medium">
          {card.holderName}
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
        <span>Validade: {card.expiryMasked}</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck size={12} />
          Tokenizado
        </span>
      </div>
    </div>
  );
}
export default WalletCard;
