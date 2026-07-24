import React from 'react';
import { MOCK_CATEGORIES_DATA } from './CategoriesReportPage';

export function CategoriesReportPrintPage() {
  return (
    <div className="min-h-screen bg-white p-8 text-slate-900 font-sans text-left">
      <header className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-950 uppercase">Curitiba 360</h1>
          <p className="text-xs font-bold text-slate-500">Sistema Integrado de Gestão de Atrações</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-black text-emerald-700 uppercase">Relatório de Categorias</h2>
          <span className="text-xs font-bold text-slate-600 block">Atração: Parque Jaime Lerner</span>
        </div>
      </header>

      <table className="w-full border-collapse text-xs mb-8">
        <thead>
          <tr className="border-b-2 border-slate-300 bg-slate-100 text-slate-700 text-[10px] font-black uppercase">
            <th className="p-3 text-left">Categoria</th>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Vendedor</th>
            <th className="p-3 text-left">Pagamento</th>
            <th className="p-3 text-right">Preço</th>
            <th className="p-3 text-right">Taxa</th>
            <th className="p-3 text-right">Qtd</th>
            <th className="p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {MOCK_CATEGORIES_DATA.map((item, idx) => (
            <tr key={idx}>
              <td className="p-3 font-bold">{item.category}</td>
              <td className="p-3">{item.date}</td>
              <td className="p-3">{item.seller}</td>
              <td className="p-3">{item.paymentType}</td>
              <td className="p-3 text-right">R$ {item.price.toFixed(2)}</td>
              <td className="p-3 text-right">R$ {item.fee.toFixed(2)}</td>
              <td className="p-3 text-right font-bold">{item.quantity}</td>
              <td className="p-3 text-right font-bold">R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] font-bold text-slate-400">
        <span>Documento impresso via Curitiba 360 Backoffice</span>
        <span>Página 1 de 1</span>
      </footer>
    </div>
  );
}

export default CategoriesReportPrintPage;
