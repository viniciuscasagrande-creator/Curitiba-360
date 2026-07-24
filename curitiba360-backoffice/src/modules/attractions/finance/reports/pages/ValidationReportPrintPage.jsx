import React from 'react';
import { MOCK_VALIDATIONS } from './ValidationReportPage';

export function ValidationReportPrintPage() {
  const totals = MOCK_VALIDATIONS.reduce(
    (acc, c) => ({
      sold: acc.sold + c.sold,
      validated: acc.validated + c.validated,
      pending: acc.pending + c.pending
    }),
    { sold: 0, validated: 0, pending: 0 }
  );

  return (
    <div className="min-h-screen bg-white p-8 text-slate-900 font-sans text-left">
      <header className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-950 uppercase">Curitiba 360</h1>
          <p className="text-xs font-bold text-slate-500">Sistema Integrado de Gestão de Atrações</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-black text-emerald-700 uppercase">Relatório de Validações</h2>
          <span className="text-xs font-bold text-slate-600 block">Atração: Parque Jaime Lerner</span>
        </div>
      </header>

      <table className="w-full border-collapse text-xs mb-8">
        <thead>
          <tr className="border-b-2 border-slate-300 bg-slate-100 text-slate-700 text-[10px] font-black uppercase">
            <th className="p-3 text-left">Categoria</th>
            <th className="p-3 text-right">Vendidos</th>
            <th className="p-3 text-right">Validados</th>
            <th className="p-3 text-right">Pendentes</th>
            <th className="p-3 text-right">Taxa Uso</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {MOCK_VALIDATIONS.map((item, idx) => {
            const rate = ((item.validated / item.sold) * 100).toFixed(1);
            return (
              <tr key={idx}>
                <td className="p-3 font-bold">{item.category}</td>
                <td className="p-3 text-right">{item.sold.toLocaleString('pt-BR')}</td>
                <td className="p-3 text-right font-bold text-emerald-700">{item.validated.toLocaleString('pt-BR')}</td>
                <td className="p-3 text-right font-bold text-amber-700">{item.pending.toLocaleString('pt-BR')}</td>
                <td className="p-3 text-right font-bold">{rate}%</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-slate-900 bg-slate-900 text-white font-black">
            <td className="p-3 uppercase">Total Geral</td>
            <td className="p-3 text-right">{totals.sold.toLocaleString('pt-BR')}</td>
            <td className="p-3 text-right text-emerald-400">{totals.validated.toLocaleString('pt-BR')}</td>
            <td className="p-3 text-right text-amber-400">{totals.pending.toLocaleString('pt-BR')}</td>
            <td className="p-3 text-right text-emerald-400">
              {((totals.validated / totals.sold) * 100).toFixed(1)}%
            </td>
          </tr>
        </tfoot>
      </table>

      <footer className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] font-bold text-slate-400">
        <span>Relatório de Acesso Catraca &bull; Emissão de Auditoria</span>
        <span>Página 1 de 1</span>
      </footer>
    </div>
  );
}

export default ValidationReportPrintPage;
