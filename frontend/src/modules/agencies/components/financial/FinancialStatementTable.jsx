import React from 'react';
import { FileText, CheckCircle2, Clock, Send, Copy } from 'lucide-react';

export default function FinancialStatementTable({ repasses = [], onCopyComprovante }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" /> Extrato Financeiro & Histórico de Repasses PIX
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Histórico auditado de liquidações financeiras B2B.</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700 text-[11px]">
          {repasses.length} solicitações registradas
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
              <th className="p-4">ID Repasse</th>
              <th className="p-4">Data Solicitação</th>
              <th className="p-4">Chave PIX / Destino</th>
              <th className="p-4">Solicitante</th>
              <th className="p-4 text-right">Valor Liquidadas (R$)</th>
              <th className="p-4">Comprovante PIX</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
            {repasses.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400">
                  Nenhum repasse efetuado até o momento.
                </td>
              </tr>
            ) : (
              repasses.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900">{rep.id}</td>
                  <td className="p-4">
                    <div>{rep.dataSolicitacao}</div>
                    {rep.dataLiquidacao && (
                      <div className="text-[10px] text-emerald-600 font-semibold">
                        Pago em: {rep.dataLiquidacao}
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-mono font-semibold text-slate-800">{rep.chavePix}</td>
                  <td className="p-4 font-semibold text-slate-800">{rep.solicitante}</td>
                  <td className="p-4 text-right font-extrabold text-emerald-600 text-sm">
                    R$ {rep.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4">
                    {rep.comprovanteId ? (
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-slate-500 truncate max-w-[140px]">
                          {rep.comprovanteId}
                        </span>
                        <button
                          onClick={() => onCopyComprovante && onCopyComprovante(rep.comprovanteId)}
                          title="Copiar ID do Comprovante"
                          className="p-1 text-slate-400 hover:text-slate-600 rounded"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-mono">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {rep.status === 'pago' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pago PIX
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3.5 h-3.5" /> Processando
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
