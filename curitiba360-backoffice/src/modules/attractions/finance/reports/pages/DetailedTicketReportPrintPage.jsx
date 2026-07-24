import React from 'react';
import { MOCK_DETAILED_ORDERS } from './DetailedTicketReportPage';

export function DetailedTicketReportPrintPage() {
  return (
    <div className="min-h-screen bg-white p-8 text-slate-900 font-sans text-left">
      <header className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-950 uppercase">Curitiba 360</h1>
          <p className="text-xs font-bold text-slate-500">Sistema Integrado de Gestão de Atrações</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-black text-emerald-700 uppercase">Relatório de Ingresso Detalhado</h2>
          <span className="text-xs font-bold text-slate-600 block">Atração: Parque Jaime Lerner</span>
        </div>
      </header>

      {MOCK_DETAILED_ORDERS.map((order) => {
        const orderTotal = order.tickets.reduce((acc, t) => acc + t.total, 0);

        return (
          <div key={order.orderId} className="mb-6 border border-slate-300 rounded-xl overflow-hidden text-xs">
            <div className="bg-slate-100 p-3 font-bold border-b border-slate-300 flex justify-between">
              <span>Pedido: {order.orderId} | Vendedor: {order.seller}</span>
              <span>Pagamento: {order.paymentMethod}</span>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-600 border-b border-slate-200">
                  <th className="p-2 text-left">Código Ticket</th>
                  <th className="p-2 text-left">Categoria</th>
                  <th className="p-2 text-right">Preço</th>
                  <th className="p-2 text-right">Taxa</th>
                  <th className="p-2 text-right">Qtd</th>
                  <th className="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.tickets.map((ticket) => (
                  <tr key={ticket.code}>
                    <td className="p-2 font-mono font-bold">{ticket.code}</td>
                    <td className="p-2">{ticket.category}</td>
                    <td className="p-2 text-right">R$ {ticket.price.toFixed(2)}</td>
                    <td className="p-2 text-right">R$ {ticket.fee.toFixed(2)}</td>
                    <td className="p-2 text-right font-bold">{ticket.quantity}</td>
                    <td className="p-2 text-right font-bold">R$ {ticket.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-black">
                  <td colSpan={5} className="p-2 text-right uppercase">Total do Pedido</td>
                  <td className="p-2 text-right text-emerald-800">R$ {orderTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}

      <footer className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] font-bold text-slate-400">
        <span>Documento emitido para auditoria interna</span>
        <span>Página 1 de 1</span>
      </footer>
    </div>
  );
}

export default DetailedTicketReportPrintPage;
