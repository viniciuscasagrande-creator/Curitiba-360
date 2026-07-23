import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Coins, RefreshCw, QrCode, ShoppingBag } from 'lucide-react';
import TransactionStatus from './TransactionStatus';

export function StatementItem({ transaction }) {
  const isPositive = transaction.amount > 0;

  const getIcon = (type) => {
    switch (type) {
      case 'cashback':
        return <Coins size={18} className="text-amber-400" />;
      case 'pix':
        return <QrCode size={18} className="text-emerald-400" />;
      case 'refund':
        return <RefreshCw size={18} className="text-sky-400" />;
      case 'purchase':
        return <ShoppingBag size={18} className="text-rose-400" />;
      default:
        return isPositive ? <ArrowDownLeft size={18} className="text-emerald-400" /> : <ArrowUpRight size={18} className="text-rose-400" />;
    }
  };

  return (
    <div className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
          isPositive ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'
        }`}>
          {getIcon(transaction.type)}
        </div>

        <div>
          <p className="text-xs font-bold text-white">{transaction.description}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {new Date(transaction.createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      <div className="text-right space-y-1">
        <span className={`text-sm font-extrabold block ${isPositive ? 'text-emerald-400' : 'text-slate-200'}`}>
          {isPositive ? '+' : ''} R$ {transaction.amount.toFixed(2)}
        </span>
        <TransactionStatus status={transaction.status} />
      </div>
    </div>
  );
}
export default StatementItem;
