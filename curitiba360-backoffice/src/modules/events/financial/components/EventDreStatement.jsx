import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function EventDreStatement({ dre = [], onExportCSV }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" /> DRE Gerencial do Evento (Demonstrativo de Resultado)
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Consolidação de Receitas, Impostos, Comissões e Custos Diretos.</p>
        </div>

        <button
          onClick={onExportCSV}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" /> Exportar CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="p-3">Linha Demonstrativa (DRE)</th>
              <th className="p-3 text-right">Valor Consolidado (R$)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
            {dre.map((item, idx) => (
              <tr
                key={idx}
                className={
                  item.tipo === 'resultado'
                    ? 'bg-emerald-50/80 font-extrabold text-emerald-900 text-xs'
                    : item.tipo === 'subtotal'
                    ? 'bg-slate-100/70 font-extrabold text-slate-900'
                    : 'hover:bg-slate-50/60'
                }
              >
                <td className="p-3">{item.linha}</td>
                <td
                  className={`p-3 text-right font-mono font-bold ${
                    item.valor < 0 ? 'text-red-600' : item.tipo === 'resultado' ? 'text-emerald-700 text-sm' : 'text-slate-900'
                  }`}
                >
                  R$ {item.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
