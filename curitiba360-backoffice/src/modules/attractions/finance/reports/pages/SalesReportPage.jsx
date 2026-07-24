import React, { useMemo, useState } from 'react';
import {
  Calendar,
  Filter,
  Printer,
  Download,
  FileSpreadsheet,
  FileText,
  Search,
  Building2,
  TrendingUp,
  DollarSign,
  Plus,
  BarChart3
} from 'lucide-react';
import { AttractionSidebar } from '../../../components/AttractionSidebar';

export const MOCK_SALES = [
  { category: 'Inteira - Parque Jaime Lerner', quantity: 1250, unitPrice: 50.0, total: 62500.0, ticketType: 'Presencial', agent: 'Bilheteria Central' },
  { category: 'Meia-Entrada (Estudante/Idoso)', quantity: 840, unitPrice: 25.0, total: 21000.0, ticketType: 'Online', agent: 'Site Oficial' },
  { category: 'Combo Família (4 ingressos)', quantity: 310, unitPrice: 140.0, total: 43400.0, ticketType: 'Online', agent: 'Agência Curitiba Tours' },
  { category: 'VIP Pass & Lounge Exclusivo', quantity: 180, unitPrice: 150.0, total: 27000.0, ticketType: 'Presencial', agent: 'Concierge' },
  { category: 'Promocional Sexta Cultural', quantity: 450, unitPrice: 35.0, total: 15750.0, ticketType: 'Online', agent: 'Site Oficial' }
];

export function SalesReportPage() {
  const [period, setPeriod] = useState('30days');
  const [allPeriod, setAllPeriod] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [customFields, setCustomFields] = useState(['Taxa de Serviço']);

  const filteredSales = useMemo(() => {
    return MOCK_SALES.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category.includes(selectedCategory);
      const matchAgent = selectedAgent === 'all' || item.agent === selectedAgent;
      const matchType = selectedType === 'all' || item.ticketType === selectedType;
      return matchCat && matchAgent && matchType;
    });
  }, [selectedCategory, selectedAgent, selectedType]);

  const totalQuantity = useMemo(() => filteredSales.reduce((acc, curr) => acc + curr.quantity, 0), [filteredSales]);
  const grandTotal = useMemo(() => filteredSales.reduce((acc, curr) => acc + curr.total, 0), [filteredSales]);

  function handlePrint() {
    window.open('/admin/atracoes/attraction-001/relatorios/vendas/print', '_blank');
  }

  function downloadCsv() {
    const header = ['Categoria', 'Quantidade', 'Valor Unitário (R$)', 'Total (R$)', 'Tipo', 'Agente'];
    const rows = filteredSales.map((s) => [s.category, s.quantity, s.unitPrice, s.total, s.ticketType, s.agent]);
    const csvContent = [header, ...rows].map((e) => e.join(';')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-vendas-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId="attraction-001" attractionName="Parque Jaime Lerner" />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <BarChart3 size={15} />
              Relatórios da Atração &bull; Vendas
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Relatório de Vendas
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Detalhamento de receita por categoria, quantidade comercializada e agente emissor.
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

        {/* Filtros Operacionais */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-slate-900 flex items-center gap-2">
              <Filter size={15} className="text-emerald-600" />
              Filtros do Relatório
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

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Período</label>
              <select
                disabled={allPeriod}
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none disabled:opacity-40"
              >
                <option value="today">Hoje</option>
                <option value="7days">Últimos 7 dias</option>
                <option value="30days">Últimos 30 dias</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Categoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todas as Categorias</option>
                <option value="Inteira">Inteira</option>
                <option value="Meia">Meia-Entrada</option>
                <option value="Combo">Combo Família</option>
                <option value="VIP">VIP Pass</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Agente / Vendedor</label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todos os Agentes</option>
                <option value="Bilheteria Central">Bilheteria Central</option>
                <option value="Site Oficial">Site Oficial</option>
                <option value="Agência Curitiba Tours">Agência Curitiba Tours</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tipo de Ingresso</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todos os Tipos</option>
                <option value="Presencial">Presencial</option>
                <option value="Online">Online</option>
              </select>
            </div>
          </div>
        </section>

        {/* Tabela de Vendas */}
        <section className="rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="p-4">Categoria do Ingresso</th>
                  <th className="p-4 text-center">Tipo</th>
                  <th className="p-4">Agente Emissor</th>
                  <th className="p-4 text-right">Quantidade</th>
                  <th className="p-4 text-right">Valor Unitário</th>
                  <th className="p-4 text-right">Total Acumulado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredSales.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 font-bold text-slate-900">{item.category}</td>
                    <td className="p-4 text-center">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-black text-slate-600">
                        {item.ticketType}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{item.agent}</td>
                    <td className="p-4 text-right font-bold text-slate-800">{item.quantity.toLocaleString('pt-BR')}</td>
                    <td className="p-4 text-right text-slate-600 font-semibold">
                      R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-right font-black text-emerald-600">
                      R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Linha Final de Totais */}
              <tfoot>
                <tr className="bg-slate-900 text-white font-black text-xs">
                  <td colSpan={3} className="p-4 uppercase tracking-wider text-[11px]">
                    Total Geral Consolidação
                  </td>
                  <td className="p-4 text-right text-emerald-400 text-sm">
                    {totalQuantity.toLocaleString('pt-BR')} ingressos
                  </td>
                  <td className="p-4 text-right text-slate-400">-</td>
                  <td className="p-4 text-right text-emerald-400 text-sm">
                    R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SalesReportPage;
