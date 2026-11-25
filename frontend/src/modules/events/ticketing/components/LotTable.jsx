import React from 'react';
import TicketingStatusBadge from './TicketingStatusBadge';
import { Ticket, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export default function LotTable({ lotes = [], onToggleStatus }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Ticket className="w-4 h-4 text-purple-600" /> Tabela de Lotes Comerciais & Virada Automática
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Virada por cota vendida ou expiração de data de vigência.</p>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          Virada Automática Ativa ✅
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="p-3">Lote Comercial</th>
              <th className="p-3">Preço (R$)</th>
              <th className="p-3 text-right">Vendas / Cota</th>
              <th className="p-3">Período de Vigência</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {lotes.map((lot) => (
              <tr key={lot.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-extrabold text-slate-900">{lot.nome}</td>
                <td className="p-3 font-mono font-bold text-emerald-700">
                  R$ {lot.precoBase?.toFixed(2)}
                </td>
                <td className="p-3 text-right font-mono font-bold">
                  {lot.qtdVendida} / {lot.cotaTotal}
                </td>
                <td className="p-3 font-mono text-[10px] text-slate-500">
                  {lot.dataInicio} <br /> até {lot.dataFim}
                </td>
                <td className="p-3">
                  <TicketingStatusBadge status={lot.status} />
                </td>
                <td className="p-3 text-center">
                  {lot.status === 'ativo' ? (
                    <button
                      onClick={() => onToggleStatus && onToggleStatus(lot.id, 'pausado')}
                      className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded text-[10px]"
                    >
                      Pausar
                    </button>
                  ) : lot.status === 'pausado' ? (
                    <button
                      onClick={() => onToggleStatus && onToggleStatus(lot.id, 'ativo')}
                      className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]"
                    >
                      Ativar
                    </button>
                  ) : (
                    <span className="text-slate-400 text-[10px] italic">Encerrado</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
