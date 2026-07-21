import React from 'react';
import { Leaf, CheckCircle2 } from 'lucide-react';

export default function CarbonCalculatorWidget({ calc = {} }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Calculadora de Carbono & Compensação Ambiental
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-mono text-[9px] font-bold">
          {calc.statusCompensacao}
        </span>
      </div>

      <div className="space-y-2 font-mono">
        <div className="text-[11px] text-emerald-300 font-bold">{calc.eventoExemplo}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-slate-300">
          <div>Transporte: {calc.transporteEstimadoKg} kg</div>
          <div>Energia: {calc.energiaEstimadaKg} kg</div>
          <div>Resíduos: {calc.residuosEstimadosKg} kg</div>
          <div className="text-emerald-400 font-bold">Total: {calc.totalEmissaoCo2Kg} kg CO₂</div>
        </div>
        <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-300 flex items-center gap-2">
          <span>Compensação sugerida: <b>{calc.arvoresParaCompensar} Árvores nativas</b></span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
