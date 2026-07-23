import React from 'react';
import { Wallet, Coins, ArrowUpRight, QrCode, CreditCard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function WalletBalance({ balance = 0, cashback = 0, blocked = 0 }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-2xl relative overflow-hidden space-y-6">
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Saldo da Carteira */}
        <div className="space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
            Saldo Disponível na Carteira
          </span>
          <span className="text-3xl md:text-4xl font-extrabold text-white">
            R$ {balance.toFixed(2)}
          </span>
          {blocked > 0 && (
            <span className="text-xs text-slate-500 block">
              (R$ {blocked.toFixed(2)} bloqueado em ordens pendentes)
            </span>
          )}
        </div>

        {/* Cashback */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 shrink-0">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
            Saldo de Cashback
          </span>
          <div className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <Coins size={22} className="text-amber-400" />
            <span>R$ {cashback.toFixed(2)}</span>
          </div>
          <span className="text-[10px] text-emerald-400 block font-medium">Disponível para abatimento</span>
        </div>
      </div>

      {/* Ações Rápida */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
        <button
          onClick={() => navigate('/carteira/pix')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
        >
          <QrCode size={16} />
          Recarregar PIX
        </button>

        <button
          onClick={() => navigate('/carteira/cashback')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
        >
          <Coins size={16} className="text-amber-400" />
          Extrato Cashback
        </button>

        <button
          onClick={() => navigate('/carteira/cartoes')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
        >
          <CreditCard size={16} className="text-amber-400" />
          Meus Cartões
        </button>

        <button
          onClick={() => navigate('/carteira/extrato')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
        >
          <ArrowUpRight size={16} className="text-amber-400" />
          Extrato Completo
        </button>
      </div>
    </div>
  );
}
export default WalletBalance;
