import React from 'react';
import { MOCK_COURTESIES } from './CourtesyReportPage';

export function CourtesyReportPrintPage() {
  const totalQuantity = MOCK_COURTESIES.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <div className="min-h-screen bg-white p-8 text-slate-900 font-sans text-left">
      <header className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-950 uppercase">Curitiba 360</h1>
          <p className="text-xs font-bold text-slate-500">Sistema Integrado de Gestão de Atrações</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-black text-amber-700 uppercase">Relatório de Cortesias Emitidas</h2>
          <span className="text-xs font-bold text-slate-600 block">Atração: Parque Jaime Lerner</span>
        </div>
      </header>

      <table className="w-full border-collapse text-xs mb-8">
        <thead>
          <tr className="border-b-2 border-slate-300 bg-slate-100 text-slate-700 text-[10px] font-black uppercase">
            <th className="p-3 text-left">Categoria</th>
            <th className="p-3 text-left">Agência / Beneficiário</th>
            <th className="p-3 text-right">Qtd</th>
            <th className="p-3 text-left">Vendedor</th>
            <th className="p-3 text-right">Valor</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {MOCK_COURTESIES.map((item, idx) => (
            <tr key={idx}>
              <td className="p-3 font-bold">{item.category}</td>
              <td className="p-3">{item.agency}</td>
              <td className="p-3 text-right font-bold text-amber-700">{item.quantity}</td>
              <td className="p-3">{item.seller}</td>
              <td className="p-3 text-right font-bold text-slate-400">R$ 0,00</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-slate-900 bg-slate-900 text-white font-black">
            <td colSpan={2} className="p-3 uppercase">Total Geral de Cortesias</td>
            <td className="p-3 text-right text-amber-300">{totalQuantity}</td>
            <td colSpan={2} className="p-3 text-right text-slate-400">R$ 0,00</td>
          </tr>
        </tfoot>
      </table>

      <footer className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] font-bold text-slate-400">
        <span>Documento emitido via Curitiba 360 Backoffice</span>
        <span>Página 1 de 1</span>
      </footer>
    </div>
  );
}

export default CourtesyReportPrintPage;
