import React from "react";
import { Link } from "react-router-dom";
import { CreditCard, Plus, ArrowRight, Sparkles } from "lucide-react";

export default function WalletBalanceCard({ balance = 0, cashback = 0, points = 0, onAddFunds = () => {} }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-5 rounded-3xl shadow-md border border-slate-700 space-y-4 font-sans animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
        <h3 className="text-xs font-bold text-slate-300 m-0 flex items-center gap-1.5 font-sans">
          <CreditCard size={14} className="text-emerald-400" /> Super Wallet
        </h3>
        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-900/60">
          Ativa
        </span>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider block">Saldo Disponível</span>
          <strong className="text-2xl font-extrabold font-mono tracking-tight text-white block">
            R$ {balance.toFixed(2)}
          </strong>
        </div>
        <button
          onClick={() => {
            const amount = prompt("Valor a adicionar (R$):");
            if (amount && !isNaN(amount)) onAddFunds(parseFloat(amount));
          }}
          className="flex items-center gap-0.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-xl border-none shadow-xs transition cursor-pointer"
        >
          <Plus size={12} /> Recarregar
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60 text-[10px] text-slate-300 font-mono">
        <div>
          <span className="text-[8px] text-slate-500 block">CASHBACK</span>
          <strong className="text-emerald-400">R$ {cashback.toFixed(2)}</strong>
        </div>
        <div>
          <span className="text-[8px] text-slate-500 block">PONTOS</span>
          <strong className="text-amber-400 flex items-center gap-0.5">
            <Sparkles size={10} className="fill-amber-400 text-amber-400" /> {points}
          </strong>
        </div>
      </div>
    </div>
  );
}
