import React from 'react';
import { Sparkles, TrendingUp, DollarSign, Calendar, ShieldCheck } from 'lucide-react';

export default function FinancialForecastChart() {
  const forecastData = [
    { dia: 'Semana 1 (21-27 Jul)', realizado: 32500, projecaoIA: 34000 },
    { dia: 'Semana 2 (28 Jul - 03 Ago)', realizado: 0, projecaoIA: 38200 },
    { dia: 'Semana 3 (04 - 10 Ago)', realizado: 0, projecaoIA: 41500 },
    { dia: 'Semana 4 (11 - 17 Ago)', realizado: 0, projecaoIA: 45000 }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Projeção de Fluxo de Caixa 30 Dias (Inteligência Artificial)</h3>
            <p className="text-[11px] text-slate-500 font-medium">Previsão baseada em sazonalidade de eventos, histórico de agências e velocidade de liquidação B2B.</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-[11px] flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" /> Modelo Preditivo Activo (Acurácia 96.8%)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {forecastData.map((item, idx) => (
          <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 block">{item.dia}</span>
            <div className="space-y-1">
              {item.realizado > 0 && (
                <div>
                  <span className="text-[9px] text-slate-400 font-medium block">Realizado:</span>
                  <span className="font-extrabold text-emerald-700">R$ {item.realizado.toLocaleString('pt-BR')}</span>
                </div>
              )}
              <div>
                <span className="text-[9px] text-purple-600 font-medium block">Projeção IA:</span>
                <span className="font-extrabold text-purple-900 text-sm">R$ {item.projecaoIA.toLocaleString('pt-BR')}</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all"
                style={{ width: `${(item.projecaoIA / 50000) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
