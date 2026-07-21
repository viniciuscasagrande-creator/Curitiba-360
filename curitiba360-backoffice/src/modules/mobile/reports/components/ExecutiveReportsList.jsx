import React from 'react';
import { FileText, Download, Share2, FileSpreadsheet } from 'lucide-react';

export default function ExecutiveReportsList({ relatorios = [], onExport }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-purple-600" /> Relatórios Executivos & Operacionais
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{relatorios.length} disponíveis</span>
      </div>

      <div className="space-y-2.5">
        {relatorios.map((rep) => (
          <div key={rep.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{rep.titulo}</span>
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px] uppercase">
                {rep.formato}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Tamanho: {rep.tamanho} • Gerado em: {rep.dataGeracao}</div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end gap-2">
              <button
                onClick={() => onExport && onExport(rep.id, 'PDF')}
                className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[9px] flex items-center gap-1 shadow-xs"
              >
                <Download className="w-3 h-3" /> Baixar PDF
              </button>
              <button
                onClick={() => onExport && onExport(rep.id, 'CSV')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded text-[9px] flex items-center gap-1 shadow-xs"
              >
                <FileSpreadsheet className="w-3 h-3 text-emerald-400" /> CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
