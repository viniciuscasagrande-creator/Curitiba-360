import React, { useMemo, useState } from 'react';
import { Gift, Filter, Printer, Download } from 'lucide-react';
import { AttractionSidebar } from '../../../components/AttractionSidebar';

export const MOCK_COURTESIES = [
  { category: 'Cortesia VIP Imprensa', agency: 'Imprensa Oficial PR', quantity: 25, seller: 'Carlos Eduardo (Admin)', total: 0.0 },
  { category: 'Cortesia Protocolar Governo', agency: 'Prefeitura de Curitiba', quantity: 40, seller: 'Fernanda Lima (Relações públicas)', total: 0.0 },
  { category: 'Cortesia Parceiro B2B', agency: 'Agência Curitiba Tours', quantity: 15, seller: 'Roberto Almeida', total: 0.0 }
];

export function CourtesyReportPage() {
  const [period, setPeriod] = useState('30days');
  const [allPeriod, setAllPeriod] = useState(false);
  const [agencyFilter, setAgencyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const totalQuantity = useMemo(() => MOCK_COURTESIES.reduce((acc, c) => acc + c.quantity, 0), []);

  function handlePrint() {
    window.open('/admin/atracoes/attraction-001/relatorios/cortesias/print', '_blank');
  }

  function downloadCsv() {
    const header = ['Categoria de Cortesia', 'Agência / Entidade Beneficiada', 'Quantidade Emitida', 'Vendedor / Responsável', 'Total (R$)'];
    const rows = MOCK_COURTESIES.map((c) => [c.category, c.agency, c.quantity, c.seller, c.total]);
    const csvContent = [header, ...rows].map((e) => e.join(';')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cortesias-emitidas-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId="attraction-001" attractionName="Parque Jaime Lerner" />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <Gift size={15} />
              Relatórios da Atração &bull; Emissões Gratuitas
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Cortesias Emitidas
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Controle e auditoria de ingressos cortesia concedidos a autoridades, imprensa e agências.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex h-10 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 hover:bg-slate-100 transition shadow-2xs"
            >
              <Printer size={15} />
              Imprimir / PDF
            </button>

            <button
              type="button"
              onClick={downloadCsv}
              className="inline-flex h-10 items-center gap-2 rounded-2xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
            >
              <Download size={15} />
              Exportar XLSX / CSV
            </button>
          </div>
        </header>

        {/* Filtros */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-slate-900 flex items-center gap-2">
              <Filter size={15} className="text-emerald-600" />
              Filtros de Cortesias
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
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Agência / Órgão</label>
              <select
                value={agencyFilter}
                onChange={(e) => setAgencyFilter(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todas as Agências</option>
                <option value="Imprensa">Imprensa Oficial</option>
                <option value="Prefeitura">Prefeitura</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Categoria de Cortesia</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todas as Categorias</option>
                <option value="VIP">Cortesia VIP</option>
                <option value="Protocolar">Cortesia Protocolar</option>
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
                  <th className="p-4">Categoria de Cortesia</th>
                  <th className="p-4">Agência / Beneficiário</th>
                  <th className="p-4 text-right">Quantidade Emitida</th>
                  <th className="p-4">Vendedor / Emissor</th>
                  <th className="p-4 text-right">Valor Registrado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {MOCK_COURTESIES.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 font-bold text-slate-900">{item.category}</td>
                    <td className="p-4 text-slate-600 font-medium">{item.agency}</td>
                    <td className="p-4 text-right font-black text-amber-600">{item.quantity}</td>
                    <td className="p-4 text-slate-600">{item.seller}</td>
                    <td className="p-4 text-right font-black text-slate-400">R$ 0,00 (Cortesia)</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-900 text-white font-black text-xs">
                  <td colSpan={2} className="p-4 uppercase tracking-wider text-[11px]">
                    Total Geral de Cortesias
                  </td>
                  <td className="p-4 text-right text-amber-300 text-sm">{totalQuantity} ingressos</td>
                  <td colSpan={2} className="p-4 text-right text-slate-400">R$ 0,00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CourtesyReportPage;
