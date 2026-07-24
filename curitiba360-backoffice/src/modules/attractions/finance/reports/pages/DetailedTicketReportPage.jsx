import React, { useState } from 'react';
import { Ticket, Printer, Download, Filter, FileText } from 'lucide-react';
import { AttractionSidebar } from '../../../components/AttractionSidebar';

export const MOCK_DETAILED_ORDERS = [
  {
    orderId: 'PED-90412',
    seller: 'Carlos Eduardo (Bilheteria)',
    paymentMethod: 'Cartão de Crédito à vista',
    date: '2026-07-23 10:15',
    tickets: [
      { code: 'TCK-90412-01', category: 'Inteira - Parque Jaime Lerner', price: 50.0, fee: 2.5, quantity: 2, total: 105.0 },
      { code: 'TCK-90412-02', category: 'Meia-Entrada (Estudante)', price: 25.0, fee: 1.25, quantity: 1, total: 26.25 }
    ]
  },
  {
    orderId: 'PED-90413',
    seller: 'Site Oficial / E-commerce',
    paymentMethod: 'PIX Instantâneo',
    date: '2026-07-23 11:30',
    tickets: [
      { code: 'TCK-90413-01', category: 'Combo Família', price: 140.0, fee: 5.0, quantity: 1, total: 145.0 }
    ]
  }
];

export function DetailedTicketReportPage() {
  function handlePrint() {
    window.open('/admin/atracoes/attraction-001/relatorios/ingresso-detalhado/print', '_blank');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId="attraction-001" attractionName="Parque Jaime Lerner" />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <Ticket size={15} />
              Relatórios da Atração &bull; Auditoria
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Ingresso Detalhado
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Agrupamento por código de pedido, forma de pagamento, taxas e detalhamento por bilhete.
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

        {/* Agrupamento por Pedido */}
        <div className="space-y-6">
          {MOCK_DETAILED_ORDERS.map((order) => {
            const orderTotal = order.tickets.reduce((acc, t) => acc + t.total, 0);

            return (
              <section key={order.orderId} className="rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
                {/* Header do Pedido */}
                <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-mono font-black text-emerald-400 text-sm bg-slate-800 px-3 py-1 rounded-xl">
                      {order.orderId}
                    </span>
                    <span>Vendedor: <strong>{order.seller}</strong></span>
                    <span>Forma de Pagamento: <strong>{order.paymentMethod}</strong></span>
                  </div>
                  <span className="text-slate-400">{order.date}</span>
                </div>

                {/* Tabela de Ingressos do Pedido */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                        <th className="p-3">Código do Ticket</th>
                        <th className="p-3">Categoria</th>
                        <th className="p-3 text-right">Preço</th>
                        <th className="p-3 text-right">Taxa</th>
                        <th className="p-3 text-right">Qtd</th>
                        <th className="p-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {order.tickets.map((ticket) => (
                        <tr key={ticket.code} className="hover:bg-slate-50/50">
                          <td className="p-3 font-mono font-bold text-slate-800">{ticket.code}</td>
                          <td className="p-3 text-slate-700">{ticket.category}</td>
                          <td className="p-3 text-right">R$ {ticket.price.toFixed(2)}</td>
                          <td className="p-3 text-right text-slate-500">R$ {ticket.fee.toFixed(2)}</td>
                          <td className="p-3 text-right font-bold text-slate-900">{ticket.quantity}</td>
                          <td className="p-3 text-right font-black text-emerald-600">R$ {ticket.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50 font-black text-slate-900 border-t border-slate-200">
                        <td colSpan={5} className="p-3 text-right uppercase text-[10px] text-slate-500">Total do Pedido</td>
                        <td className="p-3 text-right text-emerald-700 font-extrabold text-sm">
                          R$ {orderTotal.toFixed(2)}
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

export default DetailedTicketReportPage;
