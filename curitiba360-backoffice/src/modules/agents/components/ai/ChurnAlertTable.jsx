import React from 'react';
import { AlertTriangle, RefreshCw, Send, Tag } from 'lucide-react';

export default function ChurnAlertTable({ churnAlerts = [], onReactivate }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Detecção Preditiva de Churn & Reativação (IA)
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Clientes inativos com risco iminente de perda para a concorrência.</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
          {churnAlerts.length} alertas pendentes
        </span>
      </div>

      <div className="space-y-3">
        {churnAlerts.map((alertItem) => (
          <div key={alertItem.id} className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-xs">{alertItem.clienteNome}</span>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-extrabold text-[9px]">
                  Risco Churn: {alertItem.riscoChurn}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">{alertItem.sugestaoIa}</p>
              <div className="text-[10px] text-slate-500 space-x-3">
                <span>Inativo há <b>{alertItem.diasSemComprar} dias</b></span>
                <span>LTV Histórico: <b className="text-emerald-700">R$ {alertItem.ltvHistorico?.toFixed(2)}</b></span>
              </div>
            </div>

            <button
              onClick={() => onReactivate && onReactivate(alertItem)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-[11px] transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
            >
              <Send className="w-3.5 h-3.5" /> Disparar Cupom ({alertItem.cupomSugerido})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
