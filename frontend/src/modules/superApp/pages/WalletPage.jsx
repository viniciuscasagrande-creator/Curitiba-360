import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import WalletBalanceCard from "../components/WalletBalanceCard";
import { useSuperWallet } from "../hooks/useSuperWallet";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, History, AlertCircle } from "lucide-react";

export default function WalletPage() {
  const { wallet, loading, addFunds } = useSuperWallet();
  const [adding, setAdding] = useState(false);

  const getTxTypeLabel = (type) => {
    switch (type) {
      case "top_up": return "Recarga via PIX";
      case "payment_out": return "Pagamento Realizado";
      case "cashback_received": return "Cashback Recebido";
      default: return type;
    }
  };

  const getTxColor = (amount) => {
    return amount > 0 ? "text-emerald-600 font-bold" : "text-slate-800 font-bold";
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Minha Carteira</h2>
          <p className="text-[10px] text-slate-500 m-0">Adicione saldo, acompanhe extratos e gerencie cashback em um só lugar.</p>
        </div>

        {loading || !wallet ? (
          <div className="text-center py-12 text-slate-400">Carregando carteira...</div>
        ) : (
          <div className="space-y-4">
            <WalletBalanceCard
              balance={wallet.availableBalance}
              cashback={wallet.cashbackBalance}
              points={wallet.loyaltyPoints}
              onAddFunds={addFunds}
            />

            {/* Simulated credit card tokenization banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-3 flex items-start gap-2 text-[10px]">
              <AlertCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">Tokenização Ativa</span>
                <span className="text-slate-500">Seus cartões de crédito/débito cadastrados são armazenados criptografados de forma segura.</span>
              </div>
            </div>

            {/* Extrato / Transações */}
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0 flex items-center gap-1">
                <History size={14} /> Histórico de Transações
              </h3>

              <div className="divide-y divide-slate-100 font-mono text-[10px]">
                {wallet.transactions.map((tx) => (
                  <div key={tx.id} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center">
                    <div>
                      <span className="text-slate-800 font-sans font-bold block">{getTxTypeLabel(tx.type)}</span>
                      <span className="text-[8px] text-slate-455 block">{tx.description}</span>
                    </div>
                    <span className={getTxColor(tx.amount)}>
                      {tx.amount > 0 ? "+" : ""}R$ {tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
