import React from 'react';
import { MOCK_SALES } from './SalesReportPage';

export function SalesReportPrintPage() {
  const totalQuantity = MOCK_SALES.reduce((acc, curr) => acc + curr.quantity, 0);
  const grandTotal = MOCK_SALES.reduce((acc, curr) => acc + curr.total, 0);
  const emitDate = new Date().toLocaleString('pt-BR');

  return (
    <div className="min-h-screen bg-white p-8 text-slate-900 font-sans text-left">
      {/* Cabeçalho de Impressão */}
      <header className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tight">Curitiba 360</h1>
          <p className="text-xs font-bold text-slate-500">Sistema Integrado de Gestão de Atrações</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-black text-emerald-700 uppercase">Relatório Oficial de Vendas</h2>
          <span className="text-xs font-bold text-slate-600 block">Atração: Parque Jaime Lerner</span>
        </div>
      </header>

      {/* Meta Informações e Filtros Aplicados */}
      <section className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-4 text-xs">
        <div>
          <span className="font-bold text-slate-400 block uppercase text-[10px]">Período de Emissão</span>
          <strong className="text-slate-800">Todo o Período Registrado</strong>
        </div>
        <div>
          <span className="font-bold text-slate-400 block uppercase text-[10px]">Data de Emissão</span>
          <strong className="text-slate-800">{emitDate}</strong>
        </div>
        <div>
          <span className="font-bold text-slate-400 block uppercase text-[10px]">Status do Relatório</span>
          <strong className="text-emerald-700">Consolidado e Auditado</strong>
        </div>
      </section>

      {/* Tabela de Impressão */}
      <table className="w-full border-collapse text-xs mb-8">
        <thead>
          <tr className="border-b-2 border-slate-300 bg-slate-100 text-slate-700 text-[10px] font-black uppercase">
            <th className="p-3 text-left">Categoria</th>
            <th className="p-3 text-center">Tipo</th>
            <th className="p-3 text-left">Agente</th>
            <th className="p-3 text-right">Qtd</th>
            <th className="p-3 text-right">Unitário</th>
            <th className="p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {MOCK_SALES.map((item, idx) => (
            <tr key={idx}>
              <td className="p-3 font-bold">{item.category}</td>
              <td className="p-3 text-center">{item.ticketType}</td>
              <td className="p-3">{item.agent}</td>
              <td className="p-3 text-right font-bold">{item.quantity.toLocaleString('pt-BR')}</td>
              <td className="p-3 text-right">R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              <td className="p-3 text-right font-bold text-slate-950">
                R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-slate-900 bg-slate-900 text-white font-black">
            <td colSpan={3} className="p-3 uppercase">Total Geral</td>
            <td className="p-3 text-right">{totalQuantity.toLocaleString('pt-BR')}</td>
            <td className="p-3 text-right">-</td>
            <td className="p-3 text-right text-emerald-400">
              R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Rodapé de Impressão */}
      <footer className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] font-bold text-slate-400">
        <span>Documento gerado automaticamente via Curitiba 360 Backoffice</span>
        <span>Página 1 de 1</span>
      </footer>
    </div>
  );
}

export default SalesReportPrintPage;
