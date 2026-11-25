import React from 'react';
import { Wallet, ArrowUpRight, TrendingUp, AlertTriangle, RefreshCw, ShieldCheck, Sparkles, DollarSign } from 'lucide-react';

export default function FinancialCenterSummary({ metrics = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-xs">
      {/* 1. Saldo Disponível Consolidado */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Saldo Disponível</span>
          <Wallet className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-xl font-extrabold text-emerald-700">
          R$ {(metrics.saldoDisponivel || 30950.00).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">Pronto para liquidação PIX</p>
      </div>

      {/* 2. Saldo Retido em Compensação */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Saldo Retido</span>
          <TrendingUp className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-xl font-extrabold text-amber-700">
          R$ {(metrics.saldoRetido || 6300.00).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-amber-600 font-medium">Aguardando janela de cartões</p>
      </div>

      {/* 3. Total Repassado B2B */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Total Repassado</span>
          <ArrowUpRight className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-xl font-extrabold text-slate-900">
          R$ {(metrics.totalRepassado || 187000.00).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-slate-400 font-medium">Liquidado no ecossistema</p>
      </div>

      {/* 4. Pendências de Conciliação */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Divergências</span>
          <AlertTriangle className="w-4 h-4 text-red-600" />
        </div>
        <div className="text-xl font-extrabold text-red-700">
          {metrics.divergenciasPendentes || 3} vendas
        </div>
        <p className="text-[10px] text-red-500 font-medium">Bloqueando fechamento mensal</p>
      </div>

      {/* 5. Reembolsos em Fila */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Reembolsos Fila</span>
          <RefreshCw className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-xl font-extrabold text-purple-700">
          R$ {(metrics.reembolsosEmFila || 450.00).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-purple-600 font-medium">1 solicitação pendente</p>
      </div>

      {/* 6. Previsão de Caixa 30d IA */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Previsão 30d IA</span>
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
        </div>
        <div className="text-xl font-extrabold text-purple-900">
          R$ {(metrics.previsaoCaixaIA || 124500.00).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-purple-700 font-medium">+15.4% projeção com IA</p>
      </div>
    </div>
  );
}
