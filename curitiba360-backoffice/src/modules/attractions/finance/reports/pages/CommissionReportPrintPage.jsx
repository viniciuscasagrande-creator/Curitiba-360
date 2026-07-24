import React from 'react';
import { MOCK_COMMISSIONS_AGENTS } from './CommissionReportPage';

export function CommissionReportPrintPage() {
  return (
    <div className="min-h-screen bg-white p-8 text-slate-900 font-sans text-left">
      <header className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-950 uppercase">Curitiba 360</h1>
          <p className="text-xs font-bold text-slate-500">Sistema Integrado de Gestão de Atrações</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-black text-emerald-700 uppercase">Relatório de Comissões por Agente</h2>
          <span className="text-xs font-bold text-slate-600 block">Atração: Parque Jaime Lerner</span>
        </div>
      </header>

      {MOCK_COMMISSIONS_AGENTS.map((agentGroup) => {
        const agentTotalSales = agentGroup.items.reduce((acc, i) => acc + i.total, 0);
        const agentTotalCommission = agentGroup.items.reduce((acc, i) => acc + i.commissionAmount, 0);

        return (
          <div key={agentGroup.agentCode} className="mb-6 border border-slate-300 rounded-xl overflow-hidden text-xs">
            <div className="bg-slate-100 p-3 font-bold border-b border-slate-300 flex justify-between">
              <span>Agente: {agentGroup.agentName} ({agentGroup.agentCode})</span>
              <span>Agência: {agentGroup.agency}</span>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-600 border-b border-slate-200">
                  <th className="p-2 text-left">Categoria</th>
                  <th className="p-2 text-right">Qtd</th>
                  <th className="p-2 text-right">Valor</th>
                  <th className="p-2 text-right">Comissão (%)</th>
                  <th className="p-2 text-right">Comissão (R$)</th>
                  <th className="p-2 text-right">Total Venda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {agentGroup.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 font-bold">{item.category}</td>
                    <td className="p-2 text-right font-bold">{item.quantity}</td>
                    <td className="p-2 text-right">R$ {item.price.toFixed(2)}</td>
                    <td className="p-2 text-right font-bold">{item.commissionRate}%</td>
                    <td className="p-2 text-right font-bold text-emerald-700">R$ {item.commissionAmount.toFixed(2)}</td>
                    <td className="p-2 text-right font-bold">R$ {item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-black">
                  <td colSpan={4} className="p-2 text-right uppercase">Subtotal Agente</td>
                  <td className="p-2 text-right text-emerald-800">R$ {agentTotalCommission.toFixed(2)}</td>
                  <td className="p-2 text-right text-slate-900">R$ {agentTotalSales.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}

      <footer className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] font-bold text-slate-400">
        <span>Relatório de Repasse de Comissão &bull; Emissão Interna</span>
        <span>Página 1 de 1</span>
      </footer>
    </div>
  );
}

export default CommissionReportPrintPage;
