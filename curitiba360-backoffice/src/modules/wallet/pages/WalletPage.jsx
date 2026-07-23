import React from "react";
import { Wallet, ArrowUpRight, ArrowDownLeft, Coins, Landmark } from "lucide-react";

export function WalletPage() {
  const transactions = [
    { id: "TX-1", title: "Cashback - Teatro Guaíra", amount: 12.00, type: "in", date: "2026-07-22" },
    { id: "TX-2", title: "Compra Ingresso - Festival", amount: -120.00, type: "out", date: "2026-07-20" },
    { id: "TX-3", title: "Recarga de Saldo - PIX", amount: 150.00, type: "in", date: "2026-07-19" }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
          <Wallet size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Carteira Digital</h1>
          <p className="text-sm text-gray-400">Gerencie seu saldo, cashback municipal e pagamentos.</p>
        </div>
      </div>

      {/* Balance Card */}
      <div className="rounded-3xl border border-gray-800 bg-[#131720] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-600/5 blur-[40px] pointer-events-none" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">Saldo da Carteira</span>
            <span className="text-3xl font-extrabold text-white">R$ 42,00</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">Cashback Acumulado</span>
            <span className="text-2xl font-bold text-emerald-500 flex items-center gap-1">
              <Coins size={20} />
              R$ 15,40
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm py-2.5 transition flex items-center justify-center gap-1 shadow-md shadow-red-600/10">
              <ArrowUpRight size={16} />
              Recarregar
            </button>
            <button className="flex-1 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-200 font-medium text-sm py-2.5 transition flex items-center justify-center gap-1">
              <Landmark size={16} />
              Transferir
            </button>
          </div>
        </div>
      </div>

      {/* Transactions list */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Últimas Transações</h3>
        <div className="rounded-2xl border border-gray-800 bg-[#131720] divide-y divide-gray-800 overflow-hidden">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tx.type === "in" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-600/10 text-red-500"}`}>
                  {tx.type === "in" ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{tx.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{tx.date}</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${tx.type === "in" ? "text-emerald-500" : "text-red-500"}`}>
                {tx.type === "in" ? "+" : "-"} R$ {Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
