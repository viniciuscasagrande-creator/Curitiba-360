import React, { useMemo, useState } from 'react';
import { CheckCircle2, Filter, Printer, Download } from 'lucide-react';
import { AttractionSidebar } from '../../../components/AttractionSidebar';

export const MOCK_VALIDATIONS = [
  { category: 'Inteira - Parque Jaime Lerner', sold: 1250, validated: 1120, pending: 130 },
  { category: 'Meia-Entrada (Estudante/Idoso)', sold: 840, validated: 790, pending: 50 },
  { category: 'Combo Família (4 ingressos)', sold: 310, validated: 280, pending: 30 },
  { category: 'VIP Pass & Lounge Exclusivo', sold: 180, validated: 175, pending: 5 }
];

export function ValidationReportPage() {
  const [period, setPeriod] = useState('30days');
  const [allPeriod, setAllPeriod] = useState(false);
  const [validationFilter, setValidationFilter] = useState('all');

  const totals = useMemo(() => {
    return MOCK_VALIDATIONS.reduce(
      (acc, c) => ({
        sold: acc.sold + c.sold,
        validated: acc.validated + c.validated,
        pending: acc.pending + c.pending
      }),
      { sold: 0, validated: 0, pending: 0 }
    );
  }, []);

  function handlePrint() {
    window.open('/admin/atracoes/attraction-001/relatorios/validacoes/print', '_blank');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId="attraction-001" attractionName="Parque Jaime Lerner" />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <CheckCircle2 size={15} />
              Relatórios da Atração &bull; Controle de Acesso
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Relatório de Validações
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Taxa de utilização e catraca: comparativo de vendidos vs. validados na portaria.
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
              Filtros da Catraca
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

          <div className="grid gap-4 sm:grid-cols-2">
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
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Status de Validação</label>
              <select
                value={validationFilter}
                onChange={(e) => setValidationFilter(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">Todos os Ingressos</option>
                <option value="validated">Apenas Validados</option>
                <option value="pending">Apenas Pendentes</option>
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
                  <th className="p-4 text-right">Ingressos Vendidos</th>
                  <th className="p-4 text-right">Validados (Catraca)</th>
                  <th className="p-4 text-right">Pendentes</th>
                  <th className="p-4 text-right">Taxa de Uso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {MOCK_VALIDATIONS.map((item, idx) => {
                  const rate = ((item.validated / item.sold) * 100).toFixed(1);
                  return (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="p-4 font-bold text-slate-900">{item.category}</td>
                      <td className="p-4 text-right font-semibold text-slate-700">{item.sold.toLocaleString('pt-BR')}</td>
                      <td className="p-4 text-right font-black text-emerald-600">{item.validated.toLocaleString('pt-BR')}</td>
                      <td className="p-4 text-right font-bold text-amber-600">{item.pending.toLocaleString('pt-BR')}</td>
                      <td className="p-4 text-right font-black text-slate-900">{rate}%</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-900 text-white font-black text-xs">
                  <td className="p-4 uppercase tracking-wider text-[11px]">Totais Consolidados</td>
                  <td className="p-4 text-right text-slate-300 text-sm">{totals.sold.toLocaleString('pt-BR')}</td>
                  <td className="p-4 text-right text-emerald-400 text-sm">{totals.validated.toLocaleString('pt-BR')}</td>
                  <td className="p-4 text-right text-amber-400 text-sm">{totals.pending.toLocaleString('pt-BR')}</td>
                  <td className="p-4 text-right text-emerald-400 text-sm">
                    {((totals.validated / totals.sold) * 100).toFixed(1)}%
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

export default ValidationReportPage;
