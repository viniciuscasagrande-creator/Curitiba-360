import React, { useMemo, useState } from 'react';
import { Tag, Filter, Printer, Download } from 'lucide-react';
import { AttractionSidebar } from '../../../components/AttractionSidebar';

export const MOCK_CATEGORIES_DATA = [
  { category: 'Inteira - Parque Jaime Lerner', date: '2026-07-23', seller: 'Carlos Eduardo', paymentType: 'Crédito à vista', price: 50.0, fee: 2.5, quantity: 45, total: 2362.5 },
  { category: 'Meia-Entrada (Estudante/Idoso)', date: '2026-07-23', seller: 'Site E-commerce', paymentType: 'PIX', price: 25.0, fee: 1.25, quantity: 30, total: 787.5 },
  { category: 'VIP Pass & Lounge Exclusivo', date: '2026-07-22', seller: 'Concierge', paymentType: 'Crédito Parcelado', price: 150.0, fee: 7.5, quantity: 12, total: 1890.0 }
];

export function CategoriesReportPage() {
  const [period, setPeriod] = useState('30days');
  const [allPeriod, setAllPeriod] = useState(false);
  const [ticketType, setTicketType] = useState('all');
  const [paymentType, setPaymentType] = useState('all');

  function handlePrint() {
    window.open('/admin/atracoes/attraction-001/relatorios/categorias/print', '_blank');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId="attraction-001" attractionName="Parque Jaime Lerner" />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <Tag size={15} />
              Relatórios da Atração &bull; Categorias
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Relatório de Categorias
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Vendas desagregadas por categoria, modalidade de pagamento, preço e encargos.
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

        {/* Filtros */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-slate-900 flex items-center gap-2">
              <Filter size={15} className="text-emerald-600" />
              Filtros da Categoria
            </span>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={allPeriod}
                onChange={(e) => setAllPeriod(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              Todo o Período
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Período</label>
              <select
                disabled={allPeriod}
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none disabled:opacity-40"
              >
                <option value="today">Hoje</option>
                <option value="30days">Últimos 30 dias</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tipo de Ingresso</label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todos</option>
                <option value="Presencial">Presencial</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tipo de Pagamento</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todos</option>
                <option value="Crédito à vista">Crédito à vista</option>
                <option value="PIX">PIX</option>
                <option value="Crédito Parcelado">Crédito Parcelado</option>
              </select>
            </div>
          </div>
        </section>

        {/* Tabela */}
        <section className="rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Vendedor</th>
                  <th className="p-4">Tipo de Pagamento</th>
                  <th className="p-4 text-right">Preço</th>
                  <th className="p-4 text-right">Taxa</th>
                  <th className="p-4 text-right">Quantidade</th>
                  <th className="p-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {MOCK_CATEGORIES_DATA.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 font-bold text-slate-900">{item.category}</td>
                    <td className="p-4 text-slate-600 font-medium">{item.date}</td>
                    <td className="p-4 text-slate-600">{item.seller}</td>
                    <td className="p-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700">
                        {item.paymentType}
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-600">R$ {item.price.toFixed(2)}</td>
                    <td className="p-4 text-right text-slate-500">R$ {item.fee.toFixed(2)}</td>
                    <td className="p-4 text-right font-bold text-slate-800">{item.quantity}</td>
                    <td className="p-4 text-right font-black text-emerald-600">
                      R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CategoriesReportPage;
