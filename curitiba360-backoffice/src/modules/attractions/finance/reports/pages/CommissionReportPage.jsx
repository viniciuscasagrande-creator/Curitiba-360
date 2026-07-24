import React, { useState } from 'react';
import { Users, Printer, Download, Filter } from 'lucide-react';
import { AttractionSidebar } from '../../../components/AttractionSidebar';

export const MOCK_COMMISSIONS_AGENTS = [
  {
    agentName: 'João da Silva',
    agentCode: 'AGT-001',
    agency: 'Agência Curitiba Tours',
    items: [
      { category: 'Combo Família (4 ingressos)', quantity: 45, price: 140.0, commissionRate: 5.0, commissionAmount: 315.0, total: 6300.0 },
      { category: 'Inteira - Parque Jaime Lerner', quantity: 80, price: 50.0, commissionRate: 5.0, commissionAmount: 200.0, total: 4000.0 }
    ]
  },
  {
    agentName: 'Pedro da Silva',
    agentCode: 'AGT-002',
    agency: 'Operadora Brasil Turismo',
    items: [
      { category: 'VIP Pass & Lounge Exclusivo', quantity: 20, price: 150.0, commissionRate: 7.0, commissionAmount: 210.0, total: 3000.0 },
      { category: 'Promocional Sexta Cultural', quantity: 110, price: 35.0, commissionRate: 5.0, commissionAmount: 192.5, total: 3850.0 }
    ]
  }
];

export function CommissionReportPage() {
  function handlePrint() {
    window.open('/admin/atracoes/attraction-001/relatorios/comissoes/print', '_blank');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId="attraction-001" attractionName="Parque Jaime Lerner" />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <Users size={15} />
              Relatórios da Atração &bull; Repasses de Terceiros
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Relatório de Comissões
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Agrupamento por agente emissor, percentual de comissão contratual e totais por parceiro.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex h-10 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 hover:bg-slate-100 transition shadow-2xs"
          >
            <Printer size={15} />
            Imprimir / PDF
          </button>
        </header>

        {/* Agrupamento por Agente */}
        <div className="space-y-6">
          {MOCK_COMMISSIONS_AGENTS.map((agentGroup) => {
            const agentTotalSales = agentGroup.items.reduce((acc, i) => acc + i.total, 0);
            const agentTotalCommission = agentGroup.items.reduce((acc, i) => acc + i.commissionAmount, 0);
            const agentTotalQty = agentGroup.items.reduce((acc, i) => acc + i.quantity, 0);

            return (
              <section key={agentGroup.agentCode} className="rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
                <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-emerald-400 text-sm bg-slate-800 px-3 py-1 rounded-xl">
                      {agentGroup.agentCode}
                    </span>
                    <strong className="text-sm">Agente: {agentGroup.agentName}</strong>
                    <span className="text-slate-400">({agentGroup.agency})</span>
                  </div>
                  <div className="flex items-center gap-4 text-emerald-400 font-bold">
                    <span>Vendas: R$ {agentTotalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span className="bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                      Comissão: R$ {agentTotalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                        <th className="p-3">Categoria</th>
                        <th className="p-3 text-right">Qtd</th>
                        <th className="p-3 text-right">Preço Unitário</th>
                        <th className="p-3 text-right">Taxa Comissão (%)</th>
                        <th className="p-3 text-right">Valor Comissão</th>
                        <th className="p-3 text-right">Total Venda</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {agentGroup.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-800">{item.category}</td>
                          <td className="p-3 text-right font-bold text-slate-900">{item.quantity}</td>
                          <td className="p-3 text-right text-slate-600">R$ {item.price.toFixed(2)}</td>
                          <td className="p-3 text-right text-emerald-700 font-bold">{item.commissionRate}%</td>
                          <td className="p-3 text-right font-black text-emerald-600">
                            R$ {item.commissionAmount.toFixed(2)}
                          </td>
                          <td className="p-3 text-right font-black text-slate-900">
                            R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50 font-black text-slate-900 border-t border-slate-200">
                        <td className="p-3 uppercase text-[10px] text-slate-500">Subtotal Agente {agentGroup.agentName}</td>
                        <td className="p-3 text-right">{agentTotalQty}</td>
                        <td colSpan={2} className="p-3 text-right text-slate-400">-</td>
                        <td className="p-3 text-right text-emerald-600 font-extrabold text-sm">
                          R$ {agentTotalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-right text-slate-900 font-extrabold text-sm">
                          R$ {agentTotalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default CommissionReportPage;
