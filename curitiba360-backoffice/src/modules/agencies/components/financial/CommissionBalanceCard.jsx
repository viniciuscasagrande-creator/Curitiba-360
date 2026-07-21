import React from 'react';
import { DollarSign, Wallet, ArrowUpRight, Clock, ShieldCheck, TrendingUp } from 'lucide-react';

export default function CommissionBalanceCard({ carteira = {}, onRequestPayout }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* Saldo Disponível */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-500 text-xs">Saldo Disponível para Saque</span>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-extrabold text-emerald-700">
            R$ {(carteira.saldoDisponivel || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Pronto para transferência instantânea PIX</p>
        </div>
        <button
          disabled={(carteira.saldoDisponivel || 0) <= 0}
          onClick={onRequestPayout}
          className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm text-xs"
        >
          <ArrowUpRight className="w-4 h-4" /> Solicitar Repasse PIX
        </button>
      </div>

      {/* Saldo a Liberar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-500 text-xs">Saldo a Liberar (Retenção)</span>
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-extrabold text-amber-700">
            R$ {(carteira.saldoAguardando || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-amber-600 font-medium">Aguardando janela de compensação bancária</p>
        </div>
        <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-semibold">
          Ciclo: {carteira.cicloRepasse || 'Semanal'}
        </div>
      </div>

      {/* Total Repassado */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-500 text-xs">Total Repassado Acumulado</span>
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-extrabold text-slate-900">
            R$ {(carteira.totalRepassado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-blue-600 font-medium">Liquidado com sucesso no ecossistema</p>
        </div>
        <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-semibold">
          Taxa Plataforma B2B: {carteira.taxaPlataforma || 2.5}%
        </div>
      </div>

      {/* Status da Conta */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-500 text-xs">Conexão Financeira</span>
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            ✓ Homologada PIX
          </span>
          <p className="text-[11px] text-slate-500 mt-2">Pronta para liquidação automática via API bancária</p>
        </div>
      </div>
    </div>
  );
}
