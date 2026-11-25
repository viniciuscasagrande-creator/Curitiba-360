import React from 'react';
import { FileText, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ErpInvoicingPanel({ erpConnectors = [], onSync }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-purple-600" /> ERP Contábil & Emissão de Notas Fiscais (NFS-e)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{erpConnectors.length} ERPs</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {erpConnectors.map((e) => (
          <div key={e.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{e.nome}</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                  e.status === 'ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {e.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Ambiente: {e.ambiente}</div>
              <div className="text-[10px] text-emerald-800 font-mono font-bold">NFS-e Emitidas: {e.notasEmitidas.toLocaleString()}</div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end">
              <button
                onClick={() => onSync && onSync(e.nome)}
                className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold text-[9px] flex items-center gap-1 shadow-xs"
              >
                <RefreshCw className="w-3 h-3" /> Transmitir Lote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
