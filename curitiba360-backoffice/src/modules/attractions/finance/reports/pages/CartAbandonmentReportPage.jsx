import React, { useMemo, useState } from 'react';
import {
  ShoppingCart,
  Filter,
  Printer,
  Download,
  BarChart3,
  Search
} from 'lucide-react';
import { AttractionSidebar } from '../../../components/AttractionSidebar';

export const MOCK_ABANDONMENT = [
  { category: 'Inteira - Parque Jaime Lerner', quantity: 145, unitPrice: 50.0, total: 7250.0, agency: 'Direto / Website', agent: 'Sessão Web #8821' },
  { category: 'Meia-Entrada (Estudante/Idoso)', quantity: 92, unitPrice: 25.0, total: 2300.0, agency: 'Direto / Website', agent: 'Sessão Web #9914' },
  { category: 'Combo Família (4 ingressos)', quantity: 38, unitPrice: 140.0, total: 5320.0, agency: 'Agência Curitiba Tours', agent: 'Agente Roberto' },
  { category: 'VIP Pass & Lounge Exclusivo', quantity: 24, unitPrice: 150.0, total: 3600.0, agency: 'Direto / Website', agent: 'Sessão Web #1042' }
];

export function CartAbandonmentReportPage() {
  const [period, setPeriod] = useState('30days');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState('all');

  const filtered = useMemo(() => {
    return MOCK_ABANDONMENT.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category.includes(selectedCategory);
      const matchAgency = selectedAgency === 'all' || item.agency === selectedAgency;
      const matchAgent = selectedAgent === 'all' || item.agent === selectedAgent;
      return matchCat && matchAgency && matchAgent;
    });
  }, [selectedCategory, selectedAgency, selectedAgent]);

  const totalQuantity = useMemo(() => filtered.reduce((acc, c) => acc + c.quantity, 0), [filtered]);
  const grandTotal = useMemo(() => filtered.reduce((acc, c) => acc + c.total, 0), [filtered]);

  function handlePrint() {
    window.open('/admin/atracoes/attraction-001/relatorios/abandono-carrinho/print', '_blank');
  }

  function downloadCsv() {
    const header = ['Categoria', 'Quantidade Abandonada', 'Valor Unitário (R$)', 'Total Perdido (R$)', 'Agência', 'Agente / Sessão'];
    const rows = filtered.map((f) => [f.category, f.quantity, f.unitPrice, f.total, f.agency, f.agent]);
    const csvContent = [header, ...rows].map((e) => e.join(';')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `abandono-carrinho-${new Date().toISOString().slice(0, 10)}.csv`;
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
              <ShoppingCart size={15} />
              Relatórios da Atração &bull; Funil de Conversão
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Abandono de Carrinho
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Monitoramento de carrinhos não finalizados por categoria, agência e vendedor.
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
              Filtros de Análise
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Período</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="today">Hoje</option>
                <option value="7days">Últimos 7 dias</option>
                <option value="30days">Últimos 30 dias</option>
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
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Agência</label>
              <select
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todas as Agências</option>
                <option value="Direto / Website">Direto / Website</option>
                <option value="Agência Curitiba Tours">Agência Curitiba Tours</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Agente</label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todos os Agentes</option>
                <option value="Sessão Web #8821">Sessão Web #8821</option>
                <option value="Agente Roberto">Agente Roberto</option>
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
                  <th className="p-4">Categoria do Ingresso</th>
                  <th className="p-4">Agência</th>
                  <th className="p-4">Agente / Origem</th>
                  <th className="p-4 text-right">Qtd Abandonada</th>
                  <th className="p-4 text-right">Valor Unitário</th>
                  <th className="p-4 text-right">Total Não Convertido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 font-bold text-slate-900">{item.category}</td>
                    <td className="p-4 text-slate-600 font-medium">{item.agency}</td>
                    <td className="p-4 text-slate-500 font-mono">{item.agent}</td>
                    <td className="p-4 text-right font-bold text-rose-600">{item.quantity}</td>
                    <td className="p-4 text-right text-slate-600">R$ {item.unitPrice.toFixed(2)}</td>
                    <td className="p-4 text-right font-black text-slate-900">
                      R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-rose-950 text-white font-black text-xs">
                  <td colSpan={3} className="p-4 uppercase tracking-wider text-[11px]">
                    Total Abandono de Carrinho
                  </td>
                  <td className="p-4 text-right text-rose-300 text-sm">{totalQuantity} itens</td>
                  <td className="p-4 text-right text-slate-400">-</td>
                  <td className="p-4 text-right text-rose-300 text-sm">
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

export default CartAbandonmentReportPage;
