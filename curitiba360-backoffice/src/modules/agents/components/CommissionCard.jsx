import React from 'react';
import { Wallet, ArrowUpRight, DollarSign, Clock } from 'lucide-react';

export default function CommissionCard({ kpis = {}, onRequestPix }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Sua Carteira de Comissões</h3>
            <p className="text-[11px] text-slate-500 font-medium">Saldos disponíveis e futuros repasses com liquidação PIX.</p>
          </div>
        </div>

        <button
          onClick={onRequestPix}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
        >
          <ArrowUpRight className="w-4 h-4" /> Resgatar PIX Instantâneo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/60 space-y-1">
          <span className="text-slate-500 font-semibold block">Comissão Disponível para Resgate</span>
          <div className="text-2xl font-extrabold text-emerald-700">
            R$ {(kpis.comissaoDisponivel || 8530).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-emerald-600 font-semibold">Liberado para transferência em conta corrente/PIX</p>
        </div>

        <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/60 space-y-1">
          <span className="text-slate-500 font-semibold block">Comissão Prevista (Em Processamento)</span>
          <div className="text-2xl font-extrabold text-amber-700">
            R$ {(kpis.comissaoPrevista || 2150).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-amber-600 font-semibold">Será liberado na conclusão dos eventos da semana</p>
        </div>
      </div>
    </div>
  );
}
