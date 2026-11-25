import React from 'react';
import { Target, TrendingUp, DollarSign, Tag, Users } from 'lucide-react';

export default function EventMarketingKpiGrid({ kpis = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>CAC (Custo de Aquisição)</span>
          <Target className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-purple-700">
          R$ {(kpis.cacEvento || 18.5).toFixed(2)}
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Investimento médio por comprador</p>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>ROI de Marketing</span>
          <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          {kpis.roiCampanhas || 4.8}x
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">Retorno sobre investimento em tráfego</p>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Conversão de Checkout</span>
          <Users className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          {kpis.taxaConversaoCheckoutPct || 3.4}%
        </div>
        <p className="text-[10px] text-blue-600 font-medium">Visitantes que finalizam compra</p>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Descontos Concedidos</span>
          <Tag className="w-4 h-4 text-amber-500" />
        </div>
        <div className="text-2xl font-extrabold text-amber-700">
          R$ {(kpis.descontoTotalConcedido || 3450).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-amber-600 font-medium">Total economizado por cupons</p>
      </div>
    </div>
  );
}
