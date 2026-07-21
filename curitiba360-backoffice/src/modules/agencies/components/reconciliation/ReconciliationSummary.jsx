import React from 'react';
import { DollarSign, ShieldCheck, AlertTriangle, Clock, TrendingUp, CreditCard, RefreshCw } from 'lucide-react';

export default function ReconciliationSummary({ summary = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
      {/* 1. Valor Bruto */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Faturamento Bruto</span>
          <CreditCard className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-xl font-extrabold text-slate-900">
          R$ {(summary.valorBruto || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-slate-400 font-medium">Total de bilhetes emitidos</p>
      </div>

      {/* 2. Taxas Gateway */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Taxas Gateway</span>
          <DollarSign className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-xl font-extrabold text-purple-700">
          R$ {(summary.taxaGateway || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Desconto adquirente de cartão/PIX</p>
      </div>

      {/* 3. Reembolsos / Estornos */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Reembolsos & Cancel.</span>
          <RefreshCw className="w-4 h-4 text-red-500" />
        </div>
        <div className="text-xl font-extrabold text-red-600">
          R$ {(summary.reembolsos || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-red-500 font-medium">Estornos processados no período</p>
      </div>

      {/* 4. Receita Líquida */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Receita Líquida</span>
          <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-xl font-extrabold text-emerald-700">
          R$ {(summary.receitaLiquida || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">Disponível para repasse e comissão</p>
      </div>

      {/* 5. Comissão Calculada */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Comissão Calculada</span>
          <ShieldCheck className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-xl font-extrabold text-blue-700">
          R$ {(summary.comissaoTotal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-[10px] font-bold text-slate-600 flex items-center justify-between">
          <span>{summary.vendasConciliadas || 0} conciliadas</span>
          {(summary.vendasDivergentes > 0 || summary.vendasPendentes > 0) && (
            <span className="text-red-600">{summary.vendasDivergentes + summary.vendasPendentes} com pendência</span>
          )}
        </div>
      </div>
    </div>
  );
}
